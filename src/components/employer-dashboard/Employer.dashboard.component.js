import React, { Component } from 'react';
import { checkAuth } from '../../actions/auth-actions/auth_actions';
import { connect } from 'react-redux';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar
	}
})

export class EmployerDashboard extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
			console.log(this.props);
		}

    render() {
        return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
                <h1>Employer Dashboard</h1>
            </div>
        );
    }
}

export default EmployerDashboard;