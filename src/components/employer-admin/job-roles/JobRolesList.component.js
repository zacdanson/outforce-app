import { Component } from 'react';
import {
	Input,
	Button
} from '../../elements';
import { Select } from 'grommet';
import JobRoleModal from './JobRoleModal.component';
import JobRoleItem from './JobRoleItem.component';
class JobRolesList extends Component{

	constructor(props){
		super(props);
	}
	render(){

		return(
			<div>
				{ this.props.jobRoles.length >= 1 ?
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
						this.props.jobRoles.map((role,index)=>{
							return(
								<JobRoleItem
									role={role}
									key={index}
									saveJobRole={(jobRole)=>this.props.saveJobRole(jobRole)}
									deleteJobRole={(jobRole)=>this.props.deleteJobRole(jobRole)}
								/>
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

