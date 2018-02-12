import React, { Component } from 'react';
import { SideNav, SideNavExt } from '../components';

const Sidebar = (props) => {

        return(
					<div className={props.sidebar === 'max' ? 'sidebar sidebar-max' : 'sidebar minimised sidebar-min' }>
							<SideNav  user={props.user} sidebar={props.sidebar} selectedTab={props.selectedTab} location={props.location}/>
					</div>
				);
};


export default Sidebar;
