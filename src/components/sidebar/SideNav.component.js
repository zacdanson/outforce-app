import React from 'react';
import SideNavItem from './SideNavItem.component.js';

const SideNav = () => {

	return (
			<div className="side-nav-container">
				<SideNavItem
					selected={true}
					icon={<i className="fa fa-bar-chart" aria-hidden="true" style={{marginRight:5}}></i>}
					name={'Dashboard'}
				/>
				<SideNavItem
					icon={<i className="fa fa-users" aria-hidden="true" style={{marginRight:5}}></i>}
					name={'Contractors'}
				/>
				<SideNavItem
					icon={<i className="fa fa-area-chart" aria-hidden="true" style={{marginRight:5}}></i>}
					name={'Forecasts'}
				/>
				<SideNavItem
					icon={<i className="fa fa-lock" aria-hidden="true" style={{marginRight:5}}></i>}
					name={'Admin'}
				/>
			</div>
		);
};

export default SideNav;