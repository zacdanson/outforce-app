import React, { Component } from 'react';
import { checkAuth } from '../../actions/auth-actions/auth_actions';
import { connect } from 'react-redux';
import {
	Button,
	Input,
	Card
} from '../elements';

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
							<div className="row">
								<div className="col">
									<Card cardHeader="Logged Work">
									</Card>
								</div>
								<div className="col">
									<Card>

									</Card>
								</div>
								<div className="col">
									<Card>

									</Card>
								</div>
							</div>
							<div className="row">
								<div className="col">

								</div>
								<div className="col">

								</div>
							</div>
            </div>
        );
    }
}

export default ContractorDashboard;