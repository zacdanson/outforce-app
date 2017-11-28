import React, {Component} from 'react';
import HeaderLeft from '../components/header/HeaderLeft.component.js';
import HeaderRight from '../components/header/HeaderRight.component.js';


const Header = () => {
	return (
		<div className="headerStyle">
			<HeaderLeft></HeaderLeft>
			<HeaderRight></HeaderRight>
		</div>
	);
};

export default Header;