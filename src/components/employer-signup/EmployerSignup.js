import React, { Component } from 'react';
import Input from '../forms/Input.component';
import { connect } from 'react-redux';
import Loader from '../loading-animation/Loader';

import {
	updateEmail,
	updatePass
} from '../../actions/auth_actions/signup_actions';


@connect((store)=>{

	return {
		user: store.user.user,
		email: store.user.password,
		password: store.user.password,
		error: store.user.error,
		loading: store.user.loading
	};

})

class EmployerSignup extends Component{

	updateEmail(email){
		console.log(this.props);
		this.props.dispatch(updateEmail(email.target.value));
	}

	updatePassword(password){
		console.log(this.props);
		this.props.dispatch(updatePass(password.target.value));
	}

	handleSignup(){
		//this.props.dispatch(handleSignup(this.props.email, this.props.password));
	}

    render(){

        return(
            <div className="emp-signup-page-container">
                { this.props.loading ? <Loader size="large"/> : null }
                <div className="signup-form-container">
                    <div className="signup-header-container">
                        <h1 className="signup-header">OutForce</h1>
                        <small style={{color:'#bbbbbb'}}>welcome to OutForce</small>
                    </div>
                    <Input name="email" className="signup-email-input" placeholder="email" onChange={this.updateEmail.bind(this)} />
                    <Input name="password" className="password-input" placeholder="password" onChange={this.updatePassword.bind(this)} type="password"/>
                    <Input type="file" name="profile_pic" accept="image/*" />

                <Button text="Login" onClick={()=>this.handleLogin()}/>
                    <div className="loginErrorMsg">{this.props.error.message}</div>
                </div>
            </div>
        );
    }

}

export default EmployerSignup;