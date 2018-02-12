import React, { Component } from 'react';
import { connect } from 'react-redux';
import { db } from '../../../firebase-config.js'
import {
	Input,
	Button,
	Modal,
	Card
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
import { EmployerContractorsList } from '../employer-contractors-list/EmployerContractorsList.component';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		contractors: store.employer.contractors,
		formData: store.employer.formData,
		selectedUsers: store.employer.selectedUsers,
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

	goToContractor(user){
		this.props.history.push('/index/employer/employer-contractors/'+user.uid);
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

				<Card cardHeader={'All Contractors'}
					headerTools={[
						<Button
							name=' Delete'
							icon={<i className="fa fa-trash" style={{marginRight:10}}></i>  }
							className="btn-secondary delete-contractor-btn"
							onClick={this.deleteContractor.bind(this)}
						>
							Delete
						</Button>,
						<Button
						name=' Add'
						icon={<i className="fa fa-user-plus" style={{marginRight:10}}></i>  }
						openModal="true"
						className="btn-success add-contractor-btn"
						modalName="addContractorModal"
						>
						Add
						</Button>]}
				>
					<EmployerContractorsList
						user={this.props.user}
						contractors={this.props.contractors}
						onSelectUser={this.selectUser.bind(this)}
						onDoubleClick={this.goToContractor.bind(this)}
						selectAllUsers={this.selectAllUsers.bind(this)}
					/>
				</Card>

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