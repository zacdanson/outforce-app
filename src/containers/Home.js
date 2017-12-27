import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components';
import { loading } from '../actions/main_actions';
import Header from './Header';
import Sidebar from './Sidebar';


@connect((store)=>{
	return {
		user: store.user.userData,
		loading: store.main.loading
	}
})

class Home extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		$(document).scrollTop(0);
	}

	loading(){
		if(this.props.loading){
			return <Loader />
		} else {
			return (
				<div className="home-container">
					 <Header user={this.props.user} />
					 <Sidebar/>
					{this.props.children}
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