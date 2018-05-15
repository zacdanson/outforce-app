import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployerDataActions from '../../actions/EmployerDataActions';
import {
	Contractors
} from '../../components/employer-contractors';
import {
	loadingAnimation	
} from '../../actions/main_actions';
@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		contractors: store.firebaseData.contractors,
		appLoading: store.main.loadingAnimation
	}
})

export class EmployerContractors extends Component {

	constructor(props){
		super(props);
	}


	render() {

		return (
			<div id="employer-contractors" className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				<Contractors
					user={this.props.user}
					loading={this.props.appLoading}
					history={this.props.history}
					setLoadingState={(status)=>this.props.dispatch(loadingAnimation(status))}
					contractors={this.props.contractors}
					deleteContractors={(users)=>this.props.dispatch(EmployerDataActions.deleteEmployerContractors(users, this.props.user.companyId))}
					addContractor={(user)=>this.props.dispatch(EmployerDataActions.addEmployerContractor(user, this.props.user.firstName+' '+this.props.user.secondName, this.props.user.companyId, this.props.user.companyName))}
				/>
			</div>
		);
	}
}

export default EmployerContractors;