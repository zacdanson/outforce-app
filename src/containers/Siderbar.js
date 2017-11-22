import React, { Component } from 'react';
import SideNav from '../components/sidebar/SideNav';

class Sidebar extends Component{

    render(){

        const sideBarStyle = {
          backgroundColor:'#242C52',
          width: 250,
          height: '100%',
          minHeight: '100%',
					top:-75
        };

        return(
            <div style={sideBarStyle} className="sidebar">
							<SideNav/>
            </div>
        );

    }
}


export default Sidebar;