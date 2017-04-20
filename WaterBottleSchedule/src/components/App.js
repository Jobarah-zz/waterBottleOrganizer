import React, { Component } from 'react';
// import logo from '../logo.svg';
// import './App.css';
import Header from './Header';
import ManageEmployees from './ManageEmployees';
import base from '../config/base';
// import './index.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
// import employeesList from './config/employees';

BigCalendar.momentLocalizer(moment);

let initialDay = new Date('Sun Apr 16 2017');
let calculatedDate = initialDay;
let index = 0;

class App extends Component {

  constructor() {
    super();

    this.addEmployee = this.addEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);
    this.parseEmployeesToEvents = this.parseEmployeesToEvents.bind(this);
    this.addDays = this.addDays.bind(this);

    this.state = {
      employees: {}
    };

  }

  /* ==============================================================
     =|                     FIREBASE                             |=
     ============================================================== */
  componentWillMount() {

    this.ref = base.syncState('employees',
    {
      context: this,
      state: 'employees'
    });
  }

  componentWillUnMount() {
    base.removeBinding(this.ref);
  }

  /* ==============================================================
     =|                    EMPLOYEES                             |=
     ============================================================== */

  /*  =========
   | CREATE
   */
  addEmployee(employee) {

    const employees = {...this.state.employees};
    const timestamp = Date.now();

    employees[`employee${timestamp}`] = employee;

    this.setState({ employees });
  }

  /*  =========
   | UPDATE
   */
  updateEmployee(key, updatedEmployee) {

    const employees = {...this.state.employees};

    employees[key] = updatedEmployee;

    this.setState({ employees });
  }

  /*  =========
   | REMOVE
   */
  removeEmployee(key) {

      const employees = {...this.state.employees};

      employees[key] = null;

      this.setState({ employees });
  }

  parseEmployeesToEvents() {

    const events = new Array();

    Object.keys(this.state.employees).map((key)=> {

      const employee = this.state.employees[key];
      calculatedDate = this.addDays(initialDay, index);
      const _emp = {
        title: employee.username,
        'allDay': true,
        'start': calculatedDate,
        'end': calculatedDate
      };

      events.push(_emp);
        //  initialDay = this.addDays(initialDay, 1);
    });

    index = 0;
    let calcDate = this.addDays(initialDay, this.state.employees.length);

    if (initialDay === calcDate) {
      initialDay = new Date();
    }

    return events;
  }

  addDays(date, days) {
    const result = new Date(date);

    result.setDate(result.getDate() + days);

    if(result.getDay() === 6) {
      result.setDate(result.getDate() + 2);
      index+=3;
    } 
    else {
      if (result.getDay() === 0) {
        result.setDate(result.getDate() + 1);
        index+=2;
      } 
      else {
        index++;
      }
    }

    return result;
  }

   /* ==============================================================
     =|                       RENDER                               |=
     ============================================================== */

  render() {
    const events = this.parseEmployeesToEvents();

    return (
      <div className="App">
        <div className="App-header">
          <Header headerText="Water Bottle Schedule" />
        </div>
        
        <BigCalendar
          events={ events }
          defaultDate={ initialDay }
          views={ ['month'] }
        />

        <ManageEmployees
          addEmployee={ this.addEmployee }
          employees={ this.state.employees }
          updateEmployee={ this.updateEmployee }
          removeEmployee={ this.removeEmployee }
        />        
      </div>
    );
  }
}

export default App;
