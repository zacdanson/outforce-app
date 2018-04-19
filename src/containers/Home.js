import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components';
import { loading } from '../actions/main_actions';
import Header from './Header';
import Sidebar from './Sidebar';
import { selectTab } from '../actions/main_actions';
import WorkDataActions from '../actions/WorkDataActions';
import EmployerDataActions from '../actions/EmployerDataActions';
import CompanyDataActions from '../actions/CompanyDataActions';
import ContractorDataActions from '../actions/ContractorDataActions';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
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
		//	this.props.dispatch(selectTab({name: 'Dashboard', location: tab }));
		} else {
			if(currentPath !== this.props.selectedTab.location && Object.keys(gotParams).length == 0){
				//window.location = this.props.selectedTab.location;
				console.log(this.props.selectedTab.location);
			}
		}
		this.props.dispatch(loading(false))
	}

	componentWillMount(){
		if(this.props.user.userRole === 'employer'){
			this.props.dispatch(WorkDataActions.getWorkLogs(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getContractors(this.props.user.uid, this.props.user.companyId));
		}

		if(this.props.user.userRole === 'contractor'){
			this.props.dispatch(ContractorDataActions.getContractorData(this.props.user.uid));
		}

		this.props.dispatch(WorkDataActions.getWorkTypes(this.props.user.uid, this.props.user.companyId));
		this.props.dispatch(WorkDataActions.getWorkName(this.props.user.companyId));
		this.props.dispatch(CompanyDataActions.getCompanyData(this.props.user.companyId));
		this.props.dispatch(CompanyDataActions.getCurrentPayPeriod(this.props.user.companyId));
		this.props.dispatch(CompanyDataActions.getJobRoles(this.props.user.companyId));

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