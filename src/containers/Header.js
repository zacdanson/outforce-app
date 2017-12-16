import React, {Component} from 'react';
import {
	HeaderLeft,
	HeaderRight
} from '../components';


const Header = (props) => {
	return (
		<div className="headerStyle">
			<HeaderLeft/>
			<HeaderRight user={props.user}/>
		</div>
	);
};

export default Header;