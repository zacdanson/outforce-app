import React, {Component} from 'react';
import ProfileMenuItem from './ProfileMenuItem.component';
import { connect } from 'react-redux';

@connect((store)=>{
	return {
		user: store.firebaseData.userData
	}
})

class HeaderRight extends Component{
	constructor(props){
		super(props)
	}

	componentWillMount(){
		$(document).on('click', e=>{
			if($('#profile-menu').hasClass('open') && e.target.className !== 'fa fa-sort-desc'){
				this.toggleMenu();
			}
		});
	}

	toggleMenu(){

		if($('#profile-menu').hasClass('open')){
			$('#profile-menu').removeClass('open').animate({
				height:'0',
				padding:'0',
				display:'none',
				width:'0'
			}, 200);
		} else {
				$('#profile-menu').addClass('open').animate({
				height:'200px',
				padding:'8px 0',
				display:'block',
				width:'200px'
			}, 200);

		}

	}

	renderProfilePic(){
		if(this.props.user){
			return <img className="header-profile-picture" src={this.props.user.profilePicture ? this.props.user.profilePicture : require("../../../assets/images/user-avatar-placeholder.png") }/>
		}
	}

	render(){

		return(
			<div className="headerRightStyle">
				<div className="profile-picture">
					{this.renderProfilePic() }
				</div>
				<div className="profile-name">
					{this.props.user ? this.props.user.firstName + ' ' + this.props.user.secondName : ''}
				</div>
				<div className='drop-down-icon' onClick={this.toggleMenu.bind(this)}>
					<i className="fa fa-sort-desc" aria-hidden="true"></i>
				</div>
				<div id="profile-menu">
					<ProfileMenuItem name="View Profile" icon="fa-user" href="/index/user-profile" />
					<ProfileMenuItem name="Calendar" icon="fa-calendar" href="/index/user-calendar" />
					<ProfileMenuItem name="Settings" icon="fa-cog" id="lastListItem" href="/index/user-settings" />
					<ProfileMenuItem name="Sign Out" icon="fa-sign-out" id="signoutItem" href="/logout" />
				</div>
			</div>
		);
	}

}

export default HeaderRight;