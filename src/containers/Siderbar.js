import React, { Component } from 'react';
import SideNav from '../components/sidebar/SideNav.component';

class Sidebar extends Component{

    render(){

        return(
            <div className="sidebar">
				<SideNav/>
            </div>
        );

    }
}


export default Sidebar;