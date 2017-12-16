import React, { Component } from 'react';
import { logoutUser } from '../../actions/auth-actions/login_actions';

export class LogoutUser extends Component{

	constructor(props){
		super(props);
	}

	render(){

		return(
			<div>
				{ logoutUser(this.props) }
			</div>
		);
	}
}
