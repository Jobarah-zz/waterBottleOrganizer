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

let initialDay = new Date("Fri Feb 02 2017");

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

        let _emp = {
          title: employee.username,
          'allDay': true,
          'start': initialDay,
          'end': initialDay
        }

        events.push(_emp);
        initialDay = this.addDays(initialDay, 1);
    });

    return events
  }

  addDays(date, days) {
    var result = new Date(date);
    if(result.getDay() == 5) {
      result.setDate(result.getDate() + 3);
    } else if (result.getDay() == 6) {
      result.setDate(result.getDate() + 2);
    } else{
      result.setDate(result.getDate() + days);
    }
    return result;
  }

   /* ==============================================================
     =|                       RENDER                               |=
     ============================================================== */

  render() {
    let events = this.parseEmployeesToEvents();
    return (
      <div className="App">
        <div className="App-header">
          <Header headerText="Water Bottle Schedule"></Header>
          
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
        ></ManageEmployees>        
      </div>
    );
  }
}

export default App;
