import { Component } from 'react';
import {
	Input,
	Button
} from '../elements';
import {
	ImageUploader
} from '../image-uploader/FileUploader.component';
class UserProfileForm extends Component{

	constructor(props){
		super(props);
		this.state = ({
			details: this.props.user
		});
	}

	renderProfilePicture(){
		if(this.props.user){
			return <img className="user-profile-picture" src={this.props.user.profilePicture ? this.props.user.profilePicture : "../../../assets/images/user-avatar-placeholder.png"  }/>
		}
	}

	componentWillReceiveProps(nextProps){

		this.setState({
			details: nextProps.user
		});
	}

	bindInputValue(property, value){
		let newDetails = this.state.details;
		newDetails[property] = value;
		this.setState({
			details: newDetails
		});
	}

	render(){
		return (
			<div className="row">
				<div className="col-md">
					<div className="form-group">
						<span>Firstname</span>
						<Input name={'firstname'}  value={this.state.details.firstName} onChange={(e)=>this.bindInputValue('firstName', e.target.value)}  />
					</div>
					<div className="form-group">
						<span>Secondname</span>
						<Input name='secondname'  value={this.state.details.secondName} onChange={(e)=>this.bindInputValue('secondName', e.target.value)} />
					</div>
					<div className="form-group">
						<span>Email</span>
						<Input name='email'  value={this.state.details.email}  onChange={(e)=>this.bindInputValue('email', e.target.value)} />
					</div>
					<div className="form-group">
						<span>Address Line 1</span>
						<Input name='addressLine1'  value={this.state.details.address}  onChange={(e)=>this.bindInputValue('address', e.target.value)}/>
					</div>
					<div className="form-group">
						<span>City</span>
						<Input name='city'  value={this.state.details.city}  onChange={(e)=>this.bindInputValue('city', e.target.value)}/>
					</div>
					<div className="form-group">
						<span>County</span>
						<Input name='county'  value={this.state.details.county}  onChange={(e)=>this.bindInputValue('county', e.target.value)}/>
					</div>
					<div className="form-group">
					<span>Postcode</span>
					<Input name='postcode'  value={this.state.details.postcode}  onChange={(e)=>this.bindInputValue('postcode', e.target.value)}/>
				</div>
					<Button
						name="saveProfile"
						className="btn-success save-profile-button"
						text="save profile"
						onClick={()=>this.props.updateUserProfile(this.state.details)}
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
						onChange={()=>this.props.bindProfilePicture()}
					/>
				</div>
			</div>
		);
	}

}

export default UserProfileForm;