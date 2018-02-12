import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components';
import { loading } from '../actions/main_actions';
import Header from './Header';
import Sidebar from './Sidebar';
import { selectTab } from '../actions/main_actions';

@connect((store)=>{
	return {
		user: store.user.userData,
		loading: store.main.loading,
		sidebar: store.main.sidebar,
		selectedTab: store.main.selectedTab
	}
})

class Home extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		let currentPath = this.props.children.props.location.pathname;
		let gotParams = this.props.children.props.match.params;
		if(this.props.selectedTab.name === undefined || this.props.selectedTab.location === undefined){
			let tab = this.props.user.userRole === 'employer' ? '/index/employer/employer-dashboard' : '/index/contractor/contractor-dashboard';
			console.log(tab);
			this.props.dispatch(selectTab({name: 'Dashboard', location: tab }));
		} else {
			if(currentPath !== this.props.selectedTab.location && Object.keys(gotParams).length == 0){
				window.location = this.props.selectedTab.location;
				console.log(this.props.selectedTab.location);
			}
		}
	}

	loading(){
		if(this.props.loading){
			return <Loader />
		} else {
			return (
				<div className="home-container">
					 <Header user={this.props.user} />
					 <Sidebar user={this.props.user} sidebar={this.props.sidebar} selectedTab={this.props.selectedTab} location={this.props.children.props.location.pathname}/>
					{this.props.children}
				</div>
			)
		}
	}


	render(){

		return(
			 this.loading()
		);

	}

}

export default Home;