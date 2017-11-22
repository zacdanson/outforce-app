import React, { Component } from 'react';


class SideNavItem extends Component {

	constructor(props){
		super(props);

	}

	render() {

		const sideNavItem = {
			fontSize: 20
		};

		const sideNavItemSelected = {
			backgroundColor: '#8A95C0',
			fontSize: 20
		};

		let item = null;

		if(this.props.selected){
			console.log('selected');
			item = <p style={sideNavItem}>Dashboard</p>;
		} else {
			item = <p style={sideNavItemSelected}>Dashboard</p>;
		}

		return (
			<div>
				{ item }
			</div>
		);

	}

}

export default SideNavItem;
