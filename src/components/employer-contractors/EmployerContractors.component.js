import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Input,
	Button,
	Modal
} from '../elements';
import {
	addContractor
} from '../../actions/user-contractors-actions/handle-contractors';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar
	}
})

export class EmployerContractors extends Component {

	constructor(props){
		super(props);
	}


	componentWillMount(){

	}


	addContractor(){
		this.props.dispatch(addContractor());
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
							<Input name="contractorName" className="contractor-name" />
						</div>
						<div className="form-group">
							<div> Email </div>
							<Input name="contractorName" className="contractor-name" />
						</div>
						<div className="form-group">
							<div> Phone Number </div>
							<Input name="contractorName" className="contractor-name" />
						</div>
						<div className="form-group">
							<div> Message </div>
							<textarea name="contractorName" className="form-control contractor-name" rows="3" cols="30" wrap="soft"/>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}

export default EmployerContractors;