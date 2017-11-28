import React, { Component } from 'react';


class SideNavItem extends Component {

	constructor(props){
		super(props);

	}

	render() {

		let item = null;

		if(this.props.selected){
			console.log('selected');
			item = <p className="side-nav-item selected-side-nav-item">{this.props.icon}  {this.props.name}</p>;
		} else {
			item = <p className="side-nav-item">{this.props.icon}  {this.props.name}</p>;
		}

		return (
			<div>
				{ item }
			</div>
		);

	}

}

export default SideNavItem;
