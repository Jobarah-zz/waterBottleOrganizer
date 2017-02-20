import React, { Component } from 'react';
// import '../css/Header.css';

class Header extends Component {
	render() {

		const headerText = this.props.headerText;

		return(
			<h1>{headerText}</h1>
		);
	}
}

export default Header;