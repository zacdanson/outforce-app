import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTab } from '../../actions/main_actions';

@connect((store)=>{
	return {
		selectedTab: store.main.selectedTab
	}
})

export default class ProfileMenuItem extends Component{

	constructor(props){
		super(props);
	}



	changeTab(){
			this.props.dispatch(selectTab(this.props.name === 'Sign Out' ? 'Dashboard' : this.props.name ));
		}


	render() {
		return (
			<div className="profile-menu-item" id={this.props.id} onClick={this.changeTab.bind(this)}>
				<NavLink to={this.props.href}>
					<i className={"profile-menu-item-icon fa " + this.props.icon}></i>
					<span className="profile-menu-item-name">{this.props.name}</span>
				</NavLink>
			</div>
		);
	}
}