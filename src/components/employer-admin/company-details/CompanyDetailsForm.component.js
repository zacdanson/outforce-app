import { Component } from 'react';
import {
	Button,
	Input,
	Card
} from '../../elements';
import {
	ImageUploader,
	getFileName,
	getImageFile
} from '../../image-uploader/FileUploader.component';
import Loader from '../../loading-animation/Loader.component';

class CompanyDetailsForm extends Component{

	constructor(props){
		super(props);

		this.state = ({
			companyDetails: this.props.companyDetails
		});

	}

	bindInputValue(property, value){
		let companyData = this.state.companyDetails;
		companyData[property] = value;
		this.setState({
			companyDetails: companyData
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			companyDetails: nextProps.companyDetails
		});
	}

	saveCompanyDetails(){
		this.props.saveCompanyDetails(this.state.companyDetails);
	}

	bindProfilePicture(){
		let file = getImageFile({name: 'company-logo'});
		let fileName = getFileName({name: 'company-logo'});
		this.props.uploadCompanyLogo(this.state.companyDetails.companyId, file, fileName );
	}

	render(){
		let company = this.state.companyDetails;
		return(
			<div className="company-details-form">
				{this.props.loading ? <Loader/> : ''}
				<Card cardHeader="Company Details">
					<div className="row">
						<div className="col-md">
							<div className="form-group">
								<span>Company Name</span>
								<Input name={'companyName'}  value={company.companyName} onChange={(e)=>this.bindInputValue('companyName', e.target.value)}  />
							</div>
							<div className="form-group">
								<span>Address Line 1</span>
								<Input name={'address'}  value={company.address} onChange={(e)=>this.bindInputValue('address', e.target.value)}  />
							</div>
							<div className="form-group">
								<span>City</span>
								<Input name={'city'}  value={company.city} onChange={(e)=>this.bindInputValue('city', e.target.value)}  />
							</div>
							<div className="form-group">
								<span>County</span>
								<Input name={'county'}  value={company.county} onChange={(e)=>this.bindInputValue('county', e.target.value)}  />
							</div>
							<div className="form-group">
								<span>Post Code</span>
								<Input name={'postcode'}  value={company.postcode} onChange={(e)=>this.bindInputValue('postcode', e.target.value)}  />
							</div>
							<div className="form-group">
								<Button
									name="saveCompanyDetails"
									onClick={()=>this.saveCompanyDetails()}
									text=" Save"
									icon={<i className="fa fa-save"></i>}
									className="btn-success"
								/>
							</div>
						</div>
						<div className="col-md">
							<div><h5>Company Logo</h5></div>
							<img className="company-logo" src={company.logoUrl ? company.logoUrl : "../../../assets/images/user-avatar-placeholder.png"  }/>
							<ImageUploader
								className='company-logo-input'
								containerClass="company-logo-container"
								name="company-logo"
								buttonText="upload company logo"
								onChange={()=>this.bindProfilePicture()}
							/>
						</div>
					</div>
				</Card>
			</div>
		);
	}

}

export default CompanyDetailsForm;