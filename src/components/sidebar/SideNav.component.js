import React, { Component } from 'react';
import SideNavItem from './SideNavItem.component.js';
import { selectTab } from '../../actions/main_actions';
import { connect } from 'react-redux';



@connect((store)=>{
	return {
		sidebar: store.main.sidebar,
		user: store.user.userData
	}
})

class SideNav extends Component {

	render(){

		console.log('userrr- ', this.props.user);
		let employer = this.props.user.userRole === 'employer';

		return(
			<div className={this.props.sidebar === 'max' ? 'side-nav-container' : 'side-nav-container side-nav-min'}>
					<SideNavItem
						href={ this.props.user.userRole === 'employer' ? '/index/employer/employer-dashboard' : '/index/contractor/contractor-dashboard'}
						icon={<i className="fa fa-bar-chart" aria-hidden="true" style={{width: 20}}></i>}
						name='Dashboard'
						userRole={this.props.user.userRole}
						strict={false}
					/>
					<SideNavItem
						href="/index/employer/employer-contractors"
						icon={<i className="fa fa-users" aria-hidden="true" style={{width: 20}}></i>}
						name='Contractors'
						strict='employer'
						userRole={this.props.user.userRole}
					/>
					<SideNavItem
						href="/index/employer/employer-forecasts"
						icon={<i className="fa fa-area-chart" aria-hidden="true" style={{width: 20}}></i>}
						name='Forecasts'
						strict='employer'
						userRole={this.props.user.userRole}
					/>
					<SideNavItem
						href="/index/employer/employer-admin"
						icon={<i className="fa fa-lock" aria-hidden="true" style={{width: 20}}></i>}
						strict='employer'
						name='Admin'
						userRole={this.props.user.userRole}

					/>
				</div>
		);
	}
}

export default SideNav;