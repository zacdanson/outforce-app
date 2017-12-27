import React, { Component } from 'react';
import { checkAuth } from '../../actions/auth-actions/auth_actions';
import { connect } from 'react-redux';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar
	}
})

export class ContractorDashboard extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
		}

    render() {
        return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
                <h1>Contractor Dashboard</h1>
            </div>
        );
    }
}

export default ContractorDashboard;