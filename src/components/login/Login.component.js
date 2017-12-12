import React, {Component} from 'react';
import Input from '../forms/Input.component';
import Button from '../forms/Button.component';
import { connect } from 'react-redux';
import { ValidateInput } from '../../helpers/FormValidation';
import firebase from 'firebase';
import {
    handleLogin,
		bindInputValue,
		loginError,
		checkAuth
} from '../../actions/auth-actions/login_actions';
import {
	checkValid
} from '../../actions/validation_actions';

import Loader from '../loading-animation/Loader.component';


@connect((store)=>{
    return {
				formData:store.auth.formData,
        error: store.auth.error,
        loading: store.main.loading,
				formValid: store.auth.formValid
    }
})

class Login extends Component {

		componentWillMount(){
			this.props.dispatch(checkAuth(this.props));
			this.props.dispatch(loginError(null));

		}

		checkFormValidation(){
			this.props.dispatch(
				checkValid([
					this.props.formData.email.valid,
					this.props.formData.password.valid
				]));
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

		handleLogin(){
				console.log(this.props);
				this.props.dispatch(handleLogin(this.props.formData.email.value, this.props.formData.password.value));
			}

    render(){

        return(
          <div className="login-page-container">
              { this.props.loading ? <Loader size="large"/> : null }
              <div className="login-form-container">
                  <div className="login-header-container">
                      <h1 className="login-header">OutForce</h1>
                      <small style={{color:'#ebebeb'}}>welcome to OutForce</small>
                  </div>
                  <Input name="email" className="email-input" placeholder="email" onChange={this.bindInputValue.bind(this, 'email', 'email')} />
                  <Input name="password" className="password-input" placeholder="password" onChange={this.bindInputValue.bind(this, 'password', 'password')} type="password"/>
									{ this.props.formValid ? <Button className="btn-primary" text="Login" onClick={()=>this.handleLogin()}/> : <Button className="btn-primary" text="Login" onClick={()=>this.handleLogin()} disabled={true} /> }
                  <div className="loginErrorMsg">{this.props.error}</div>
									<div className="small-link">
										<small>
											<a href="/employer-signup">
												Not registered? Signup here.
											</a>
										</small>
									</div>
              </div>
          </div>
        );

    }

}


export default Login;