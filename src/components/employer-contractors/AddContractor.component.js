import { Component } from 'react';
import { Modal, Input, Button } from '../elements';

class AddContractor extends Component{

	constructor(props){
		super(props);
		this.state = ({
			contractorDetails:{
				firstName:'',
				secondName:'',
				email: '',
				phoneNumber: ''
			}
		});
	}

	updateContractorDetails(input, value){
		let contractor = this.state.contractorDetails;
		contractor[input] = value;
		this.setState({contractorDetails:contractor});
	}

	render(){
		return(
			<Modal
				name="addContractorModal"
				titleIcon={<i className="fa fa-user"></i>}
				modalTitle="Add Contractor"
				rightBtn={<Button onClick={()=>this.props.addContractor(this.state.contractorDetails)} text="add" className="btn-sm btn-success" data-dismiss="addContractorModal"/>}
				rightBtnName='Add'
				rightBtnIcon={<i className="fa fa-plus"></i>}
				closeBtn={true}
			>
				<div>
					<small className="add-contractor-modal-info">By adding a contractor, they will also be invited to signup to OutForce.</small>
					<div className="form-group">
						<div> First Name </div>
						<Input name="contractorFirstName" className="contractor-first-name" onChange={(e)=>this.updateContractorDetails('firstName', e.target.value)} value={this.state.contractorDetails.firstName} />
					</div>
					<div className="form-group">
						<div> Second Name </div>
						<Input name="contractorSecondName" className="contractor-second-name" onChange={(e)=>this.updateContractorDetails('secondName', e.target.value)} value={this.state.contractorDetails.secondName} />
					</div>
					<div className="form-group">
						<div> Email </div>
						<Input name="contractorName" className="contractor-name" onChange={(e)=>this.updateContractorDetails('email', e.target.value)} value={this.state.contractorDetails.email} />
					</div>
					<div className="form-group">
						<div> Phone Number </div>
						<Input name="contractorName" className="contractor-name" onChange={(e)=>this.updateContractorDetails('phoneNumber', e.target.value)} value={this.state.contractorDetails.phoneNumber}/>
					</div>
				</div>
			</Modal>
		);
	}

}

export default AddContractor;