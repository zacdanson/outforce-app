import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../../firebase-config.js'
import ContractorListItem from './ContractorListItem.component';
import {
	Input,
	Button,
	Modal,
} from '../elements';
import { NavLink } from 'react-router-dom';
import Loader from '../loading-animation/Loader.component';

import {
	addContractor,
	deleteContractors,
	getContractors,
	bindAddContractorInput,
	clearFormData,
	selectUser,
	clearSelectedUsers
} from '../../actions/user-contractors-actions/handle-contractors';
import { loadingAnimation } from '../../actions/main_actions';


@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		contractors: store.contractor.contractors,
		formData: store.contractor.formData,
		selectedUsers: store.contractor.selectedUsers,
		loadingAnimation: store.main.loadingAnimation
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

	componentWillMount(){
		this.props.dispatch(loadingAnimation(true));
	}

	componentDidMount(){
		let { uid, companyId } = this.props.user;
		this.contractorListener = db.collection("companies").doc(companyId).collection('contractors')
			.onSnapshot((querySnapshot) => {
				this.props.dispatch(getContractors(uid, companyId));
		});

	}

	componentWillUnmount() {
		this.clearFormData();
		this.contractorListener();
		this.props.dispatch(clearSelectedUsers());
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

	deleteContractor(){
		this.props.dispatch(deleteContractors(this.props.selectedUsers, this.props.contractors));
	}

	selectUser(user){
		this.props.dispatch(selectUser(this.props.selectedUsers, user));
	}

	selectAllUsers(){
		this.props.contractors.map(user=>{
			this.props.dispatch(selectUser(this.props.selectedUsers, user));
		});
	}


	render() {

		return (
			<div id="employer-contractors" className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				<Button
					name=' Delete'
					icon={<i className="fa fa-trash" style={{marginRight:10}}></i>  }
					className="btn-danger delete-contractor-btn"
					onClick={this.deleteContractor.bind(this)}
				>
					Delete
				</Button>
				<Button
					name=' Add'
					icon={<i className="fa fa-user-plus" style={{marginRight:10}}></i>  }
					openModal="true"
					className="btn-secondary add-contractor-btn"
					modalName="addContractorModal"
				>
					Add
				</Button>
				<h1 className="home-content-header">Contractors
				</h1>

				{ this.props.loadingAnimation ? <Loader size="small" /> : ''}

				{ this.props.contractors.length > 0 ?
					<table className="table">
					<thead>
						<tr>
							<th scope="col"><input id="select-all-users" onClick={this.selectAllUsers.bind(this)} type="checkbox"/></th>
							<th scope="col">Name</th>
							<th scope="col">Email</th>
							<th scope="col">Phone Number</th>
							<th scope="col">Registered</th>
						</tr>
					</thead>
					<tbody className="panel-body">
					{this.props.contractors.map((user)=>{
						return <ContractorListItem
										key={user.uid}
										uid={user.uid}
										name={user.fullName || user.name}
										email={user.email}
										phoneNumber={user.phoneNumber}
										registered={user.linkActive}
										onClick={()=>this.selectUser(user)}
										onDblClick={()=>this.props.history.push('/index/employer/employer-contractors/'+user.uid)}
						/>})}
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
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'name')} value={this.props.formData.name} />
						</div>
						<div className="form-group">
							<div> Email </div>
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'email')} value={this.props.formData.email} />
						</div>
						<div className="form-group">
							<div> Phone Number </div>
							<Input name="contractorName" className="contractor-name" onChange={this.bindAddContractorInput.bind(this,'phoneNumber')} value={this.props.formData.phoneNumber}/>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default EmployerContractors;