import React, {Component} from 'react';




class HeaderRight extends Component{
	render(){

		const headerRightStyle = {
			width:200,
			height:75,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginRight:20
		};

		const profilePicture = {
			borderRadius: '50%',
			width:50
		};

		const profileName = {

		};

		const dropDown = {

		};

		return(
			<div style={headerRightStyle}>
				<div style={profilePicture}>
					<img src="../../assets/images/profilepic.jpeg" style={profilePicture}/>
				</div>
				<div style={profileName}>
					Zac Danson
				</div>
				<div style={dropDown}>
					<i className="fa fa-sort-desc" aria-hidden="true"></i>
				</div>
			</div>
		);
	}

}

export default HeaderRight;