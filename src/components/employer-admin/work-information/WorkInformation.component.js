import React, { Component } from 'react';
import { Card, Input, Button} from '../../elements';
import swal from 'sweetalert';
import DashboardCard from '../../dashboard-card/DashboardCard.component';
import PayPeriods from '../../pay-periods/PayPeriods.component';

export class WorkInformation extends Component {

	constructor(props){
		super(props);
		this.state = {};

		this.state = {
			workTypes : this.props.workTypes,
			newWorkType: {value:'', valid: ''},
			newWorkTypeId: { value: '', valid: '' },
			duration: { value: '', valid: ''},
			globalWorkName: this.props.globalWorkName
		};
	}

	editWorkTypeDescription(index){

		let workTypes = this.state.workTypes;
		workTypes[index].edit = true;
		this.setState({workTypes});
	}

	updateWorkType(workTypeId, workType, duration){
		this.props.updateWorkType(workTypeId, workType, duration);
		let workTypes = this.state.workTypes;
		_.each(workTypes, (type, index)=>{
			if(type.workTypeId === workTypeId){
				type.edit = false;
			}
		});
		this.setState({
			workTypes
		});
	}


	changeWorkTypeName(index, e){
		let workTypes = this.state.workTypes;
		workTypes[index].valid = e.target.value !== '' ? true : false;
		workTypes[index].workType = e.target.value;
		this.setState({workTypes});
	}

	changeWorkTypeDuration(index, e){
		let workTypes = this.state.workTypes;
		workTypes[index].valid = e.target.value !== '' ? true : false;
		workTypes[index].duration = e.target.value;
		this.setState({workTypes});
	}


	addWorkType(){
		let { workTypes, newWorkType, newWorkTypeId } = this.state;
		if(!newWorkTypeId.valid || !newWorkType.valid ){
			return;
		}
		workTypes.push({workTypeId: newWorkTypeId.value, workType: newWorkType.value });
		this.setState({workTypes, newWorkTypeId: { valid: '', value:''}, newWorkType: { valid: '', value:''}});
		this.props.createWorkType( newWorkTypeId.value, newWorkType.value);
	}

	changeNewWorkType(e){
		let valid = e.target.value === '' ? false : true;
		this.setState({newWorkType:{value: e.target.value, valid }});
	}

	changeNewWorkTypeDuration(e){
		let valid = e.target.value === '' ? false : true;
		this.setState({duration:{value: e.target.value, valid }});
	}

	changeNewWorkTypeId(e){
		let worktypes = this.state.workTypes;
		let valid = true;
		let id = e.target.value;
		worktypes.map(type=>{
			if(type.workTypeId === id || id === ''){
					valid = false;
			}
		});
		this.setState({newWorkTypeId:{ value: e.target.value, valid  }});

	}

	removeWorkType(workTypeId, index){
		swal({
			title: "Are you sure?",
			text: "Are you sure that you want to remove this workType?",
			icon: "warning",
			buttons:true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				delete this.state.workTypes[index];
				this.props.deleteWorkType(workTypeId);
			}
		});
	}

	updateWorkName(value){
		this.setState({
			globalWorkName: value
		});
	}

	saveGlobalWorkName(){
		this.props.updateGlobalWorkName(this.state.globalWorkName);

	}


	render() {

		return (
			<div className="work-information-container">


					<div className="custom-inline-row">
						<Card
							cardHeader="Global Work Name"
							className="custom-row-item"
						>
							<div>
								<Input
									name="globalWorkName"
									value={this.state.globalWorkName ? this.state.globalWorkName : ''}
									placeholder="No Global Name Set"
									onChange={(e)=>this.updateWorkName(e.target.value)}
								/>
								<br></br>
								<Button
									name="UpdateGlobalWorkName"
									text="Update Global Work Name"
									className="btn-success"
									onClick={()=>this.props.updateGlobalWorkName(this.state.globalWorkName)}
								/>
								<i className="fa fa-info-circle pull-right"></i>
							</div>
						</Card>
						<Card cardHeader={this.state.globalWorkName +' Types'} color="blue" className="custom-row-item">
							{ this.state.workTypes.length < 1 ? <p style={{width:'100%'}}> Not yet added any work types. </p> :
								<table className="table">
									<thead>
									<tr>
										<th className="table_cell" scope="col">ID</th>
										<th className="table_cell" scope="col">Description</th>
										<th className="table_cell" scope="col">Duration</th>
										<th className="table_cell" scope="col"><i className="fa fa-pencil"></i></th>
									</tr>
									</thead>
									<tbody>
									{
										this.state.workTypes.map((type, index)=>{
											if(type.edit){
												return(
													<tr key={index} className={index %2 == 0 ? 'table_row_dark' : ''}>
														<td className="table_cell" scope="row">{type.workTypeId}</td>
														<td className="table_cell" ><Input value={type.workType} onChange={(e)=>this.changeWorkTypeName(index, e)} className={type.valid === false ? ' invalid' : ''}/></td>
														<td className="table_cell" ><Input value={type.duration} onChange={(e)=>this.changeWorkTypeDuration(index, e)} className={type.valid === false ? ' invalid' : ''}/></td>
														<td className="table_cell" ><i className="fa fa-save" onClick={()=>this.updateWorkType(type.workTypeId, type.workType, type.duration)} style={{color:'#FF6E00'}}></i><i className="fa fa-trash" style={{color:'red'}} onClick={()=>this.removeWorkType(type.workTypeId, index)}></i></td>
													</tr>
												);
											} else {
												return(
													<tr key={index}  className={index %2 != 0 ? 'table_row_dark' : ''}>
														<td scope="row">{type.workTypeId}</td>
														<td>{type.workType}</td>
														<td>{type.duration}</td>
														<td><i className="fa fa-edit" onClick={()=>this.editWorkTypeDescription(index)}></i></td>
													</tr>
												);
											}
										})
									}
									</tbody>
								</table> }
						</Card>
					</div>
					<div className="custom-row">
						<Card cardHeader={'Add '+ this.state.globalWorkName +' Type'} color="blue" className="custom-row-item">
								<small> Work Types can be attached to logged work, to describe the type of work completed.</small>
								<div className="row" style={{paddingTop:'20px'}}>
									<div className="col">
										<Input value={this.state.newWorkTypeId.value} placeholder="ID" onChange={(e)=>this.changeNewWorkTypeId(e)} className={this.state.newWorkTypeId.valid === false ? ' invalid' : '' }/>
										<small>ID must be unique.</small>
									</div>
									<div className="col">
										<Input value={this.state.newWorkType.value} placeholder="name" onChange={(e)=>this.changeNewWorkType(e)} className={this.state.newWorkType.valid === false ? ' invalid' :  ''} />
										<br></br>

									</div>
									<div className="col">
										<Input value={this.state.duration.value} placeholder="duration" onChange={(e)=>this.changeNewWorkTypeDuration(e)} className={this.state.duration.valid === false ? ' invalid' :  ''} />
										<small>in minutes</small>
										<br></br>
										<Button style={{marginTop:5}}  text='Save Work Type'  className='btn-success pull-right' onClick={()=>this.addWorkType()}/>
									</div>
								</div>
						</Card>
						<PayPeriods
							payPeriod={this.props.payPeriod}
							selectedPayFrequency={this.props.company.selectedPayFrequency}
							updatePayPeriodDetails={(selectedPayFrequency)=>this.props.updatePayPeriodDetails(selectedPayFrequency)}
						/>
					</div>

			</div>


		);
	}
}

export default WorkInformation;