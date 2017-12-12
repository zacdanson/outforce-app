import React from 'react';
import SideNavItem from './SideNavItem.component.js';
import { selectTab } from '../../actions/main_actions';
import { connect } from 'react-redux';


const SideNav = (props) => {

	return (
			<div className="side-nav-container ">
				<SideNavItem
					href="/index/user-dashboard"
					icon={<i className="fa fa-bar-chart" aria-hidden="true" style={{width: 20}}></i>}
					name='Dashboard'
				/>
				<SideNavItem
					href="/index/employer-contractors"
					icon={<i className="fa fa-users" aria-hidden="true" style={{width: 20}}></i>}
					name='Contractors'
				/>
				<SideNavItem
					href="/index/employer-forecasts"
					icon={<i className="fa fa-area-chart" aria-hidden="true" style={{width: 20}}></i>}
					name='Forecasts'
				/>
				<SideNavItem
					href="/index/employer-admin"
					icon={<i className="fa fa-lock" aria-hidden="true" style={{width: 20}}></i>}
					name='Admin'
				/>
			</div>
		);
};

export default SideNav;