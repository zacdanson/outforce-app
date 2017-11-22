import React, {Component} from 'react';
import HeaderLeft from '../components/HeaderLeft.js';

class Header extends Component {

	render () {
		const style = {
			background: '#fff',
			height: 75,
			boxShadow:'0 6px 25px 0 rgba(38, 50, 56, 0.2)'
		};

		return (
			<div style={style}>
				<HeaderLeft></HeaderLeft>
			</div>
		);
	}
}

export default Header;