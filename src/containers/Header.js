import React, {Component} from 'react';
import { connect } from 'react-redux';

import {
	HeaderLeft,
	HeaderRight
} from '../components';

@connect((store)=>{
	return {
		user: store.user.userData,
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
				<HeaderRight user={this.props.user}/>
			</div>
		);

	}
}

export default Header;