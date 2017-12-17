import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Input,
	Button,
	Modal
} from '../elements';
import {
	addContractor,
	bindAddContractorInput,
	clearFormData
} from '../../actions/user-contractors-actions/handle-contractors';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		formData: store.contractor.formData
	}
})

export class EmployerContractors extends Component {

	constructor(props){
		super(props);
	}

	bindAddContractorInput(property, input){
		this.props.dispatch(bindAddContractorInput(input.target.value, property));
	}

	clearFormData(){
		this.props.dispatch(clearFormData());
	}

	componentWillUnmount(){
		this.clearFormData();
	}


	addContractor(){
		let { phoneNumber, email, name } = this.props.formData;
		let { uid, fullName, companyName, companyId } = this.props.user;
		this.props.dispatch(addContractor(
			uid,
			phoneNumber,
			email,
			name,
			fullName,
			companyName,
			companyId
		));
	}

	render() {

		return (
			<div id="employer-contractors" className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				<Button
					name=' Add Contractor'
					icon={<i className="fa fa-user-plus" style={{marginRight:10}}></i>  }
					openModal="true"
					className="btn-secondary add-contractor-btn"
					modalName="addContractorModal"
				>
					Add Contractor
				</Button>
				<h1 className="home-content-header">Contractors
				</h1>
				{ this.props.contractors ?
				<table className="table">
					<thead>
						<tr>
							<th scope="col"><input type="checkbox"/></th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Phone Number</th>
						</tr>
					</thead>
					<tbody className="panel-body">

					</tbody>
				</table> : <div style={{textAlign:'center'}}> No Contractors </div> }
				<Modal
					name="addContractorModal"
					titleIcon={<i className="fa fa-user"></i>}
					modalTitle="Add Contractor"
					rightBtn={true}
					rightBtnName='Add'
					rightBtnIcon={<i className="fa fa-plus"></i>}
					rightBtnOnClick={this.addContractor.bind(this)}
					closeBtn={true}
				>
					<div>
						<small className="add-contractor-modal-info">By adding a contractor, they will also be invited to signup to OutForce.</small>
						<div className="form-group">
							<div> Name </div>
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'name')} />
						</div>
						<div className="form-group">
							<div> Email </div>
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'email')} />
						</div>
						<div className="form-group">
							<div> Phone Number </div>
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'phoneNumber')} />
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default EmployerContractors;