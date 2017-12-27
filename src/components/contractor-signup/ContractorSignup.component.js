import React, { Component } from 'react';
import {
	Input,
	Button
} from '../elements';
import { connect } from 'react-redux';
import Loader from '../loading-animation/Loader.component';
import { ValidateInput } from '../../helpers/FormValidation';

import {
	bindInputValue,
	handleSignup,
	handleContractorSignup,
	checkInviteLink
} from '../../actions/auth-actions/signup_actions';

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
		this.props.dispatch(checkInviteLink());
	}

	bindInputValue(property, valType, element){
		console.log(element, valType, property);
		let valid = ValidateInput({
			element: element.target,
			type: valType
		});
		this.props.dispatch(bindInputValue(element.target.value, property, valid));
		this.checkFormValidation();
	}

	checkFormValidation(){
		this.props.dispatch(
			checkValid([
				this.props.formData.email.valid,
				this.props.formData.password.valid,
				this.props.formData.firstName.valid,
				this.props.formData.secondName.valid,
				this.props.formData.phoneNumber.valid
			]));
	}

	handleContractorSignup(){
		this.props.dispatch(
			handleContractorSignup(
				this.props.formData.email.value,
				this.props.formData.password.value,
				this.props.formData.companyId.value
			));
	}

	render() {
			console.log(this.props.loading);
			return(
				<div className="signup-page-container">
					{ this.props.loading ? <Loader size="large"/> : null }
					<div className="signup-form-container">
						<div className="signup-header-container">
							<h1 className="signup-header">OutForce</h1>
							<small style={{color:'#ebebeb'}}>welcome to OutForce</small>
						</div>
						<Input name="email" className="signup-email-input" placeholder="email" onChange={this.bindInputValue.bind(this,'email', 'email')} type="email"/>
						<Input name="password" className="signup-password-input" placeholder="password" onChange={this.bindInputValue.bind(this, 'password', 'password')} type="password"/>
						<Input name="firstname" className="signup-password-input" placeholder="first name" onChange={this.bindInputValue.bind(this, 'firstName', 'required')} />
						<Input name="secondname" className="signup-password-input" placeholder="second name" onChange={this.bindInputValue.bind(this, 'secondName', 'required')}/>
						<Input name="phonenumber" className="signup-password-input" placeholder="phone number" onChange={this.bindInputValue.bind(this, 'phoneNumber', 'required')}/>

						{ this.props.formValid ? <Button className="form-control btn-primary" text="Signup" id="signupBtn" onClick={this.handleContractorSignup.bind(this)}/> : <Button className="form-control btn-primary" text="Signup" id="signupBtn" disabled={true}/>}
						<div className="signupErrorMsg">{this.props.error }</div>
						<div className="small-link">
							<small>
								<a href="/login">
									Already registered? Login here.
								</a>
							</small>
						</div>
					</div>
				</div>
		);


	}
}