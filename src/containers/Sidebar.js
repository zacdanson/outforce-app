import React, { Component } from 'react';
import SideNav from '../components/sidebar/SideNav.component';
import { connect } from 'react-redux';

@connect((store)=>{
	return {
		selectedTab: store.main.selectedTab,
		sidebar: store.main.sidebar
	}
})

class Sidebar extends Component{

	constructor(props){
		super(props);
		console.log(this.props);
	}


    render(){
        return(
					<div className={this.props.sidebar === 'max' ? 'sidebar sidebar-max' : 'sidebar minimised sidebar-min' }>
							<SideNav />
            </div>
        );

    }
}


export default Sidebar;