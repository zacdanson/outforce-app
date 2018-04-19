import React, { Component } from 'react';
import { SideNav, SideNavExt } from '../components';

class Sidebar extends Component{

	constructor(props){
		super(props);
	}

	render(){
		console.log('location === ', this.props.location);
		return(
			<div className={this.props.sidebar === 'max' ? 'sidebar sidebar-max' : 'sidebar minimised sidebar-min' }>
				<SideNav  user={this.props.user} sidebar={this.props.sidebar} selectedTab={this.props.selectedTab} location={this.props.location}/>
			</div>
		);
	}

};


export default Sidebar;
