import React, { Component } from 'react';
import {
	Input,
	Button
} from '../../components/elements';
import { connect } from 'react-redux';
import Loader from '../../components/loading-animation/Loader.component';
import { ValidateInput } from '../../helpers/FormValidation';
import ContractorSignupForm from '../../components/contractor-signup-form/ContractorSignupForm.component.js';

import {
	bindInputValue,
	handleSignup,
	handleContractorSignup,
	checkInviteLink
} from '../../actions/auth-actions/signup_actions';
import {
	signupContractor
} from '../../actions/auth-actions/auth_actions';

import {
	checkValid
} from '../../actions/validation_actions';

@connect((store)=>{

	return {
		formData: store.auth.formData,
		error: store.auth.error,
		loading: store.main.loading,
		formValid: store.auth.formValid
	};

})


export default class ContractorSignup extends Component {

	constructor(props){
		super(props);

	}

	componentWillMount(){
		let {cid, id, type } = this.props.match.params;
		this.cid = cid;
		this.id = id;
		this.props.dispatch(checkInviteLink(id, cid, type));
	}

	render() {
			console.log(this.props.loading);
			return(
				<div className="signup-page-container">
					<ContractorSignupForm
						signupContractor={(contractor)=>this.props.dispatch(signupContractor(contractor, this.id, this.cid))}
					/>
				</div>
		);


	}
}