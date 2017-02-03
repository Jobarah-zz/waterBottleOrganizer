import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Calendar from './components/Calendar';
import ManageEmployees from './components/ManageEmployees';
import base from './config/base';
// import employeesList from './config/employees';

class App extends Component {

  constructor() {
    super();

    this.addEmployee = this.addEmployee.bind(this);
    this.updateEmployee = this.updateEmployee.bind(this);
    this.removeEmployee = this.removeEmployee.bind(this);

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


   /* ==============================================================
     =|                       RENDER                               |=
     ============================================================== */

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header headerText="Water Bottle Schedule"></Header>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        
        <Calendar></Calendar>

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
