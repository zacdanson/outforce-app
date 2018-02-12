import React, { Component } from 'react';
import { Card, Input, Button} from '../../elements';
import swal from 'sweetalert';
import DashboardCard from '../../dashboard-card/DashboardCard.component';


export class WorkInformation extends Component {

	constructor(props){
		super(props);
		this.state = {};

		this.state = { workTypes : this.props.workDataObject.workTypes, newWorkType: {value:'', valid: ''} , newWorkTypeId: { value: '', valid: '' } };

		console.log(this.state);
	}

	editWorkTypeDescription(index){
		console.log('edit work type', index);
		let workTypes = this.state.workTypes;
		workTypes[index].edit = true;
		this.setState({workTypes});
		console.log(workTypes);
	}

	updateWorkTypes(index){
		let workTypes = this.state.workTypes;
		if(workTypes[index].valid === false){
			return;
		}
		delete workTypes[index].edit;
		delete workTypes[index].valid;
		this.setState({workTypes});
		this.props.updateWorkTypes(this.state.workTypes);
	}

	changeWorkTypeName(index, e){
		let workTypes = this.state.workTypes;
		workTypes[index].valid = e.target.value !== '' ? true : false;
		workTypes[index].workType = e.target.value;
		this.setState({workTypes});
	}


	addWorkType(){
		let { workTypes, newWorkType, newWorkTypeId } = this.state;
		if(!newWorkTypeId.valid || !newWorkType.valid ){
			return;
		}
		workTypes.push({workTypeId: newWorkTypeId.value, workType: newWorkType.value });
		this.setState({workTypes, newWorkTypeId: { valid: '', value:''}, newWorkType: { valid: '', value:''}});
		this.props.updateWorkTypes(this.state.workTypes);
	}

	changeNewWorkType(e){
		let valid = e.target.value === '' ? false : true;
		this.setState({newWorkType:{value: e.target.value, valid }});
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

	removeWorkType(index){
		let workTypes = this.state.workTypes;
		swal({
			title: "Are you sure?",
			text: "Are you sure that you want to remove this workType?",
			icon: "warning",
			buttons:true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				let id = workTypes[index].workTypeId;
				delete workTypes[index];
				this.props.deleteWorkType(id);
			}
		});
	}


	render() {
		let { workTypes, newWorkType, newWorkTypeId} = this.state;
		return (
			<div className="work-information-container">

				<div className="row">
					<div className="col-4">
						<Card
							cardHeader="Global Work Name"
						>
							<div>
								<Input
									name="globalWorkName"
									value={this.props.workDataObject.globalWorkName ? this.props.workDataObject.globalWorkName : ''}
									placeholder="No Global Name Set"
									onChange={(e)=>this.props.updateWorkDataObject(e)}
								/>
								<br></br>
								<Button
									name="UpdateGlobalWorkName"
									text="Update Global Work Name"
									className="btn-success"
									onClick={()=>this.props.saveGlobalWorkName()}
								/>
								<i className="fa fa-info-circle pull-right"></i>
							</div>
						</Card>
						<Card cardHeader={this.props.workName +' Types'} color="blue" >
							{ workTypes.length < 1 ? <p style={{width:'100%'}}> Not yet added any work types. </p> :
								<table className="table">
									<thead>
									<tr>
										<th className="table_cell" scope="col">ID</th>
										<th className="table_cell" scope="col">Description</th>
										<th className="table_cell" scope="col"><i className="fa fa-pencil"></i></th>
									</tr>
									</thead>
									<tbody>
									{
										workTypes.map((type, index)=>{
											if(type.edit){
												return(
													<tr key={index} className={index %2 == 0 ? 'table_row_dark' : ''}>
														<td className="table_cell" scope="row">{type.workTypeId}</td>
														<td className="table_cell" ><Input value={type.workType} onChange={(e)=>this.changeWorkTypeName(index, e)} className={type.valid === false ? ' invalid' : ''}/></td>
														<td className="table_cell" ><i className="fa fa-save" onClick={()=>this.updateWorkTypes(index)} style={{color:'#FF6E00'}}></i><i className="fa fa-trash" style={{color:'red'}} onClick={()=>this.removeWorkType(index)}></i></td>
													</tr>
												);
											} else {
												return(
													<tr key={index}  className={index %2 != 0 ? 'table_row_dark' : ''}>
														<td scope="row">{type.workTypeId}</td>
														<td>{type.workType}</td>
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
					<div className="col" >
						<Card cardHeader={'Add '+ this.props.workName +' Type'} color="blue">
								<small> Work Types can be attatched to logged work, to describe the type of work completed.</small>
								<div className="row" style={{paddingTop:'20px'}}>
									<div className="col">
										<Input value={newWorkTypeId.value} placeholder="ID" onChange={(e)=>this.changeNewWorkTypeId(e)} className={newWorkTypeId.valid === false ? ' invalid' : '' }/>
										
										<small>ID must be unique.</small>
									</div>
									<div className="col">
										<Input value={newWorkType.value} placeholder="name" onChange={(e)=>this.changeNewWorkType(e)} className={newWorkType.valid === false ? ' invalid' :  ''} />
										<br></br>
										<Button  text='Save Work Type'  className='btn-success pull-right' onClick={()=>this.addWorkType()}/>
									</div>
								</div>
						</Card>
					</div>
				</div>
			</div>


		);
	}
}

export default WorkInformation;