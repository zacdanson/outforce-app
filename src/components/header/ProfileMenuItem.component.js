import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';


export default class ProfileMenuItem extends Component{

	constructor(props){
		super(props);
	}

	render() {
		return (
			<div className="profile-menu-item" id={this.props.id} onClick={this.props.onClick}>
				<NavLink to={this.props.href}>
					<i className={"profile-menu-item-icon fa " + this.props.icon}></i>
					<span className="profile-menu-item-name">{this.props.name}</span>
				</NavLink>
			</div>
		);
	}
}