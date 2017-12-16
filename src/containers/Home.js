import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Loader } from '../components';
import { loading } from '../actions/helper-actions/helper-actions';
import Header from './Header';
import Sidebar from './Sidebar';


@connect((store)=>{
	return {
		user: store.user.userData,
		loading: store.user.loading
	}
})

class Home extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){
		this.props.dispatch(loading(true));
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