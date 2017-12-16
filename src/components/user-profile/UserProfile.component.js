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
import {

	bindInputValue,
	saveProfile,
	uploadProfilePicture

} from '../../actions/user-profile-actions/user-profile-actions';

@connect((store)=>{
	return {
		user: store.user.userData,
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
		this.props.dispatch(uploadProfilePicture(this.props.user.uid ,file, fileName ));
	}

	saveProfile(){
		this.props.dispatch(saveProfile(this.props.user));
	}

	renderProfilePicture(){
		if(this.props.user){
				return <img className="user-profile-picture" src={this.props.user.profilePicture ? this.props.user.profilePicture : "../../../assets/images/user-avatar-placeholder.png"  }/>
		}
	}

	render(){
		return(
			<div className={this.props.sidebar === 'max' ? 'home-content user-profile-container home-content-max' : 'home-content user-profile-container home-content-min' }>
			{ this.props.loading ? <Loader size="large"/> : null }
				<h1 className="home-content-header">Your Profile</h1>
				<div className="row">
					<div className="col-md">
						<div className="form-group">
							<span>Firstname</span>
							<Input name={'firstname'}  value={this.props.user ? this.props.user.firstName : ' '} onChange={this.bindInputValue.bind(this, 'firstName')}  />
						</div>
						<div className="form-group">
							<span>Secondname</span>
							<Input name='secondname'  value={this.props.user ? this.props.user.secondName: ' '} onChange={this.bindInputValue.bind(this, 'secondName')} />
						</div>
						<div className="form-group">
							<span>Email</span>
							<Input name='email'  value={this.props.user ? this.props.user.email : ' '}  onChange={this.bindInputValue.bind(this, 'email')} />
						</div>
						<div className="form-group">
							<span>Company Name</span>
							<Input name='companyName'  value={this.props.user ? this.props.user.companyName : ' '}  onChange={this.bindInputValue.bind(this, 'companyName')}/>
						</div>
						<Button
							name="saveProfile"
							className="btn-primary save-profile-button"
							text="save profile"
							onClick={this.saveProfile.bind(this)}
						/>
					</div>
					<div className="col-md">
						<div>Profile Picture</div>
						{ this.renderProfilePicture() }
						<ImageUploader
							className='upload-profile-picture'
							containerClass="upload-picture-container"
							name="user-profile-picture"
							buttonText="upload picture"
							onChange={this.bindProfilePicture.bind(this)}
						/>
					</div>
				</div>
			</div>
		);
	}

}


export default UserProfile;