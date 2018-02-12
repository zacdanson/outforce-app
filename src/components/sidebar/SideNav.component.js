import React, { Component } from 'react';
import SideNavItem from './SideNavItem.component.js';
import { selectTab } from '../../actions/main_actions';
import { connect } from 'react-redux';


const SideNav = (props)=>{


		let employer = props.user.userRole === 'employer';

		return(
			<div className={props.sidebar === 'max' ? 'side-nav-container' : 'side-nav-container side-nav-min'}>
					<SideNavItem
						href={ props.user.userRole === 'employer' ? '/index/employer/employer-dashboard' : '/index/contractor/contractor-dashboard'}
						icon="fa fa-bar-chart"
						name='Dashboard'
						route="employer-dashboard"
						userRole={props.user.userRole}
						strict={false}
						location={props.location}
					/>
					<SideNavItem
						href="/index/employer/employer-contractors"
						icon="fa fa-users"
						name='Contractors'
						strict='employer'
						route="employer-contractors"
						userRole={props.user.userRole}
						location={props.location}
					/>
					<SideNavItem
						href="/index/employer/employer-forecasts"
						icon='fa-area-chart'
						name='Forecasts'
						strict='employer'
						route="employer-forecasts"
						userRole={props.user.userRole}
						location={props.location}
					/>
					<SideNavItem
						href="/index/employer/employer-admin"
						icon='fa-lock'
						strict='employer'
						name='Admin'
						route="employer-admin"
						userRole={props.user.userRole}
						location={props.location}
					/>
				</div>
		);
};

export default SideNav;