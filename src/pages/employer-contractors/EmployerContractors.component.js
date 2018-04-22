import React, { Component } from 'react';
import { connect } from 'react-redux';
import EmployerDataActions from '../../actions/EmployerDataActions';
import {
	Contractors
} from '../../components/employer-contractors';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		contractors: store.firebaseData.contractors
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
					history={this.props.history}
					contractors={this.props.contractors}
					deleteContractors={(users)=>this.props.dispatch(EmployerDataActions.deleteEmployerContractors(users, this.props.user.companyId))}
					addContractor={(user)=>this.props.dispatch(EmployerDataActions.addEmployerContractor(user, this.props.user.firstName+' '+this.props.user.secondName, this.props.user.companyId, this.props.user.companyName))}
				/>
			</div>
		);
	}
}

export default EmployerContractors;