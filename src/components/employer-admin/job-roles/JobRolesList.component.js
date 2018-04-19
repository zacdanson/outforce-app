import { Component } from 'react';
import {
	Input,
	Button
} from '../../elements';
import { Select } from 'grommet';
import JobRoleModal from './JobRoleModal.component';

class JobRolesList extends Component{

	constructor(props){
		super(props);
		this.state = ({
			editing:'',
			jobRoles: this.props.jobRoles,
			assignOptions: [{label:'auto', value:'auto'},{label:'manual', value: 'manual'}],
			selectedRole: {}
		});
		console.log('prooops-', props);
	}

	editJobRoleName(value, index){
		let jobRoles = this.state.jobRoles;
		jobRoles[index].name = value;
		this.setState({jobRoles});
	}

	updateJobRoleConditions(value, index){
		let jobRoles = this.state.jobRoles;
		jobRoles[index].roleRequirements = value;
		this.setState({jobRoles});
		clearTimeout(this.saveJobRoleTimeout);
		this.saveJobRoleTimeout = setTimeout(()=>{
			this.saveJobRole(jobRoles[index]);
		}, 1500);
	};


	editJobRoleHourlyRate(value, index){
		let jobRoles = this.state.jobRoles;
		jobRoles[index].hourlyRate = value;
		this.setState({jobRoles});
	}

	editJobRoleAssign(value, index){
		let jobRoles = this.state.jobRoles;
		jobRoles[index].assign = value;
		this.setState({jobRoles});
		console.log(this.state);
		this.saveJobRole(jobRoles[index]);
	}

	saveJobRole(jobRole){
		let { id, name, hourlyRate, assign } = jobRole;
		let condition = jobRole.roleRequirements ? jobRole.roleRequirements : '';
		this.props.saveJobRole(id, name, hourlyRate, assign, condition);
		this.setState({editing:''})
	}

	editJobRole(jobRole){
		this.setState({editing: jobRole.id });
	}

	deleteJobRole(jobRole){
		swal({
			title: "Are you sure?",
			text: "Are you sure that you want to remove this jobRole?",
			icon: "warning",
			buttons:true,
			dangerMode: true,
		}).then(willDelete => {
			if (willDelete) {
				this.props.deleteJobRole(jobRole.id);
			}
		});
	}

	render(){
		console.log(this.state);
		let display = '';
		if(this.props.assignCondition === 'numLogs'){
			display = this.props.globalWorkName + '\'s';
		} else if(this.props.assignCondition === 'totalHours'){
			display = 'Hours';
		} else if(this.props.assignCondition === 'timeEmployed') {
			display = 'Months';
		}
		return(
			<div>
				{ this.state.jobRoles.length >= 1 ?
				<table className="table">
					<thead>
					<tr><th className="table_cell" scope="col">Name</th>
						<th className="table_cell" scope="col">Hourly Rate</th>
						<th className="table_cell" scope="col">Assign</th>
						{ this.props.assignCondition ? <th className="table_cel" scope="col">Amount of {display}</th> : <th>Role Requirements</th> }
						<th scope="col">Edit</th>
					</tr>
					</thead>
					<tbody>
					{
						this.props.jobRoles.map((jobRole, index)=>{
							let assigned = jobRole.assign ? {label: jobRole.assign, value: jobRole.assign} : '';
							return(
								<tr key={index}  className={index %2 != 0 ? 'table_row_dark' : ''}>
									{
										this.state.editing === jobRole.id ?

											<td className="middle-align">
												<span style={{display:'inline-block'}}>
													<Input
														style={{display:'inline-block'}}
														name="jobRoleName"
														value={jobRole.name}
														onChange={(e)=>this.editJobRoleName(e.target.value, index)}
													/>
												</span>
											</td>: <td className="middle-align">{jobRole.name}</td>}
									{
										this.state.editing === jobRole.id ?
											<td className="middle-align">
												<span style={{display:'inline-block'}}>
													<Input
														style={{display:'inline-block'}}
														name="jobRoleHourlyRate"
														value={jobRole.hourlyRate}
														onChange={(e)=>this.editJobRoleHourlyRate(e.target.value, index)}
													/>
												</span>
												</td>
											 :
											<td className="middle-align">£{jobRole.hourlyRate}</td>
									}
									<td className="middle-align">
										<Select value={assigned} options={this.state.assignOptions} onChange={(e)=>this.editJobRoleAssign(e.value.value, index)}/>
									</td>
									<td className="middle-align">{ jobRole.assign === 'auto' ? <Input placeholder={'required ' + display} value={this.state.jobRoles[index].roleRequirements || ''} onChange={(e)=>this.updateJobRoleConditions(e.target.value, index)} /> : 'Please Set Job Roles Conditions' }</td>
									<td className="middle-align">
										{ this.state.editing === jobRole.id ?
											<span>
												<Button name="saveName" onClick={()=>this.saveJobRole(jobRole)} style={{display:'inline-block', marginRight:5}} className="btn-default"><i className="fa fa-check"></i></Button>
												<Button name="deleteJobRole" onClick={()=>this.deleteJobRole(jobRole)} style={{display:'inline-block'}} className="btn-danger"><i className="fa fa-trash-o"></i></Button>
											</span>
											:
											<Button className="btn-default" onClick={()=>this.editJobRole(jobRole)}><i className="fa fa-edit"></i></Button>
										}
									</td>
								</tr>
							);
						})
					}
					</tbody>
				</table> : 'No Job Roles Added Yet.' }
			</div>
		);
	}
};

export default JobRolesList;