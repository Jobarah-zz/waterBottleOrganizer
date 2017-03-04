import React, { Component } from 'react';
import { rules, Form, Input, Select, Textarea, Button } from 'react-validation/lib/build/validation.rc';
import validations from './FormRules/FormValidations';
// import '../css/ManageEmployees.css';
Object.assign(rules, validations);

class ManageEmployees extends Component {
	constructor() {
		super();
		this.renderEmployees = this.renderEmployees.bind(this);
	}

	renderEmployees(key) {
		const employee = this.props.employees[key];

		return (
			<tr key={key}>
				<td>
					<input type="text" placeholder="Employee Name" name="username" value={employee.username} onChange={(e) => this.updateEmployee(e,key)}/>
				</td>
				<td>
					<input type="text" placeholder="Employee Email" name="email" value={employee.email} onChange={(e) => this.updateEmployee(e,key)}/>
				</td>
				<td>
					<i className="fa fa-trash" onClick={()=> this.deleteEmployee(key)}></i>
				</td>
			</tr>
		);
	}

	createEmployee(event) {
		console.log(event);
		event.preventDefault();

		const newEmployee = {
			username: this.username.value,
			email: this.email.value
		};

		this.username.value = '';
		this.email.value = '';

		this.props.addEmployee(newEmployee);
    	
	}

	updateEmployee(e, key) {
		const employee = this.props.employees[key];
		
		// tale a copy of that fish and update it with the new data
		const updatedEmployee = {
			...employee,
			[e.target.name]: e.target.value
		};

		console.log(updatedEmployee);

		this.props.updateEmployee(key, updatedEmployee);
	}

	deleteEmployee(key) {
		const isDeleted =  confirm('Would you like to delete the employee?');

		if (isDeleted) {
			this.props.removeEmployee(key);
		}
	}

	render() {
		return(
			<div className="container employee-edit" >
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />

				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{ Object.keys(this.props.employees).map(this.renderEmployees) }
					</tbody>
				</table>

				<Form onSubmit={(e) => this.createEmployee(e)}>
	                <div>
	                    <label>
	                        <Input className="input-field" ref={Input => this.username = Input } type="text" value="Employee Name" validations={['required', 'name']}/>
	                    </label>
	                </div>
	                <div>
	                    <label>
	                        <Input className="input-field" value="email@email.com" ref={Input => this.email = Input } name="email" validations={['required', 'email']}/>
	                    </label>
	                </div>   
				</Form>
			</div>
		);
	}
}

export default ManageEmployees;