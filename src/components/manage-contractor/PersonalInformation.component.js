import React, { Component } from 'react';
import {
	Button,
	Input,
	Card
} from '../elements'
import { Select } from 'grommet';
import LoadingAnimation  from '../../components/loading-animation/LoadingAnimation.component';

class PersonalInformation extends Component{

	constructor(props){
		super(props);

		this.state = ({
			contractor : this.props.contractor,
			jobRoles: this.props.jobRoles
		});
	}

	updateDetails(property, value){
		let newDetails = this.state.contractor;
		newDetails[property] = value;

		this.setState({ contractor : newDetails});
	}

	componentWillReceiveProps(nextProps){
		this.setState({loading:false});
		this.setState({contractor: nextProps.contractor, jobRoles: nextProps.jobRoles});
	}

	shouldComponentUpdate(nextProps, nextState){

		return nextState.contractor !== '';
	}

	render(){
		let contractor = this.state.contractor;
		return(
			<Card className="card" color="blue" cardHeader={contractor.fullName || '' + "'s Details"}>
				{ this.state.contractor === '' ? <LoadingAnimation size="small"/> :
				<div className="container" style={{paddingTop:20}}>
					<div className="form-group">
						<span>First Name</span>
						<Input value={contractor.firstName || ''} placeholder="no first name added yet" onChange={(e)=>this.updateDetails('firstName', e.target.value)} />
						<br></br>
						<span>Last Name</span>
						<Input value={contractor.secondName || ''} placeholder="no second name added yet." onChange={(e)=>this.updateDetails('secondName', e.target.value)}/>
					</div>
					<div className="form-group">
						<span>Phone Number</span>
						<Input value={contractor.phoneNumber || ''} placeholder='no phone number added yet.' onChange={(e)=>this.updateDetails('phoneNumber', e.target.value)} />
					</div>
					<div className="form-group"><span>Email</span>
						<Input value={contractor.email || ''} placeholder="no email added yet." onChange={(e)=>this.updateDetails('email', e.target.value)}/>
					</div>
					<div className="form-group"><span>Address</span>
						<Input value={contractor.address || ''} placeholder='no address added yet.' onChange={(e)=>this.updateDetails('address', e.target.value)} />
					</div>
					<div className="form-group">
							<span>Job Role</span>
							<div className="mui--text-dark">{contractor.jobRoleName || 'no job role assigned yet.'} </div>
					</div>
					<div className="form-group">
						<div style={{marginRight:26}}>
							<span>Hourly Rate</span>
							<div className="mui--text-dark">{contractor.hourlyRate ? '£' : '' }{contractor.hourlyRate || 'no job role assigned yet.'}</div>
						</div>
					</div>
					<Button
						className="btn-success add-work-data-btn"
						icon={<i className="fa fa-save"></i>}
						onClick={()=>this.props.saveContractorDetails(this.state.contractor)}
						text=" save"
						style={{marginRight:20}}
					/>
				</div> }
			</Card>
		);
	};

}
export default PersonalInformation;