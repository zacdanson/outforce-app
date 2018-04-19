import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
	HeaderLeft,
	HeaderRight,
	HeaderCenter
} from '../components';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		loading: store.main.loading
	}
})

class Header extends Component{

	constructor(props){
		super(props);
	}

	render(){

		return (
			<div className="headerStyle">
				<HeaderLeft/>
				<HeaderCenter/>
				<HeaderRight user={this.props.user}/>
			</div>
		);

	}
}

export default Header;