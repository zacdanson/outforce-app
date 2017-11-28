import React, {Component} from 'react';
import Input from '../forms/Input.component';
import Button from '../forms/Button.component';
import { connect } from 'react-redux';
import {
    handleLogin,
    updateEmail,
    updatePass
} from '../../actions/auth_actions/login_actions';
import Loader from '../loading-animation/Loader';


@connect((store)=>{
    return {
        user: store.user.user,
        email: store.user.email,
        password: store.user.password,
        error: store.user.error,
        loading: store.user.loading
    }
})

class Login extends Component {

    updateEmail(email){
        console.log(this.props);
        this.props.dispatch(updateEmail(email.target.value));
    }

    updatePassword(password){
        console.log(this.props);
        this.props.dispatch(updatePass(password.target.value));
    }

    handleLogin(){
      this.props.dispatch(handleLogin(this.props.email, this.props.password));
    }

    render(){

        return(
          <div className="login-page-container">
              { this.props.loading ? <Loader size="large"/> : null }
              <div className="login-form-container">
                  <div className="login-header-container">
                      <h1 className="login-header">OutForce</h1>
                      <small style={{color:'#bbbbbb'}}>welcome to OutForce</small>
                  </div>
                  <Input name="email" className="email-input" placeholder="email" onChange={this.updateEmail.bind(this)} />
                  <Input name="password" className="password-input" placeholder="password" onChange={this.updatePassword.bind(this)} type="password"/>
                  <Button text="Login" onClick={()=>this.handleLogin()}/>
                  <div className="loginErrorMsg">{this.props.error.message}</div>
              </div>
          </div>
        );

    }

}


export default Login;