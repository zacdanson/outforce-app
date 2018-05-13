import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Input,
	Button
}from '../elements';
import Loader from '../loading-animation/Loader.component';
import {
	ImageUploader,
	getFileName,
	getImageFile
} from '../image-uploader/FileUploader.component';
import UserProfileForm from './UserProfileForm.component';

import {

	bindInputValue,
	saveProfile,
	uploadProfilePicture

} from '../../actions/user-profile-actions/user-profile-actions';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		error: store.user.error,
		loading: store.main.loading,
		sidebar: store.main.sidebar
	}
})

class UserProfile extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
	}

	bindInputValue(property, target) {
		this.props.dispatch(bindInputValue(target.target.value, property));
	}

	bindProfilePicture(){
		let file = getImageFile({name: 'user-profile-picture'});
		let fileName = getFileName({name: 'user-profile-picture'});
		this.props.dispatch(uploadProfilePicture(this.props.user.uid , file, fileName ));
	}

	updateUserProfile(userData){
		userData.fullName = userData.firstName + ' ' + userData.secondName;
		this.props.dispatch(saveProfile(userData));
	}

	renderProfilePicture(){
		if(this.props.user){
				return <img className="user-profile-picture" src={this.props.user.profilePicture ? this.props.user.profilePicture : require("/assets/images/user-avatar-placeholder.png")  }/>
		}
	}

	render(){
		return(
			<div className={this.props.sidebar === 'max' ? 'home-content user-profile-container home-content-max' : 'home-content user-profile-container home-content-min' }>
			{ this.props.loading ? <Loader size="large"/> : null }
				<h1 className="home-content-header">Your Profile</h1>
				<UserProfileForm
					user={this.props.user}
					updateUserProfile={(userProfile)=>this.updateUserProfile(userProfile)}
					bindProfilePicture={()=>this.bindProfilePicture()}
				/>
			</div>
		);
	}

}


export default UserProfile;