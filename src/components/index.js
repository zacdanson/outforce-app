import React, { Component } from 'react';
import { checkAuth } from '../actions/auth-actions/login_actions';
import { connect } from 'react-redux';
import Loader from './loading-animation/Loader.component';
import { loading, handleError } from '../actions/helper-actions/helper-actions';

import Header from '../containers/Header';
import Sidebar from '../containers/Sidebar';


@connect((store)=>{
	return {
		user: store.user.user,
		loading: store.user.loading
	}
})

class Home extends Component{

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.dispatch(loading(true));
		this.props.dispatch(checkAuth(this.props));
	}

	loading(){
		if(this.props.loading){
			return <Loader />
		} else {
			return (
				<div className="home-container">
					 <Header user={this.props.user} />
					 <Sidebar/>
				</div>
			)
		}
	}


	render(){

		return(
			 this.loading()
		);

	}

}

export default Home;