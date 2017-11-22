import React, { Component } from 'react';
import SideNavItem from './SideNavItem.js';

class SideNav extends Component {

	render() {

		return (
			<div className="side-nav-container">
				<SideNavItem icon={<i className="fa fa-bar-chart" aria-hidden="true"></i>} />
			</div>
		);
	}

}

export default SideNav;