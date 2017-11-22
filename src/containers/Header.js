import React, {Component} from 'react';
import HeaderLeft from '../components/header/HeaderLeft.js';
import HeaderRight from '../components/header/HeaderRight.js';


class Header extends Component {

	render () {
		const style = {
			background: 'rgb(255, 255, 255)',
			height: 75,
			boxShadow: 'rgba(38, 50, 56, 0.2) 0px 6px 25px 0px',
			width: '100%',
			position: 'absolute',
			top: 0,
			width: '100%',
			display: 'flex',
			justifyContent: 'space-between'
		};

		return (
			<div style={style}>
				<HeaderLeft></HeaderLeft>
				<HeaderRight></HeaderRight>
			</div>
		);
	}
}

export default Header;