import React, {Component} from 'react';
import HeaderLeft from '../components/header/HeaderLeft.component.js';
import HeaderRight from '../components/header/HeaderRight.component.js';


const Header = (props) => {
	return (
		<div className="headerStyle">
			<HeaderLeft/>
			<HeaderRight user={props.user}/>
		</div>
	);
};

export default Header;