import React, { Component } from 'react';
import SideNavItem from './SideNavItem.component.js';
import { selectTab } from '../../actions/main_actions';
import { connect } from 'react-redux';



@connect((store)=>{
	return {
		sidebar: store.main.sidebar
	}
})

class SideNav extends Component {

	render(){


		return(
				<div className={this.props.sidebar === 'max' ? 'side-nav-container' : 'side-nav-container side-nav-min'}>
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
	}
}

export default SideNav;