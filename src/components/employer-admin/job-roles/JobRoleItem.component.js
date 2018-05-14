import { Button, Input } from '../../elements';
import React, { Component }from 'react';


class JobRole extends Component {

	constructor(props){
		super(props);

		let role = this.props.role;
		this.state = {
			name: role.name,
			hourlyRate: role.hourlyRate,
			assign: role.assign,
			roleRequirements: role.roleRequirements || '',
			editing: false,
			id: role.id
		};
	}

	editJobRole(){
		this.setState({
			editing: !this.state.editing
		});
	}

	editName(value){
		this.setState({
			name: value
		});
	}

	editHourlyRate(value){
		this.setState({
			hourlyRate: value
		});
	}

	editAssign(value){
		this.setState({
			assign: value
		});
	}

	editRoleRequriements(value){
		this.setState({
			roleRequirements: value
		});
	}

	saveJobRole(){
		let role = this.getJobRole();
		this.props.saveJobRole(role);
		this.editJobRole();

	}

	deleteJobRole(){
		let role = this.getJobRole();
		this.props.deleteJobRole(role);
	}

	getJobRole(){
		return {
			name:this.state.name,
			hourlyRate: this.state.hourlyRate,
			roleRequirements: this.state.roleRequirements,
			id: this.state.id,
			assign: this.state.assign
		}
	}

	render(){
		console.log('------------- jobh role ', this.state);
		return (
			<tr>
				{this.state.editing ? <td><Input value={this.state.name} onChange={(e)=>this.editName(e.target.value)}/></td>: <td>{this.state.name}</td> }
				{this.state.editing ? <td><Input value={this.state.hourlyRate} onChange={(e)=>this.editHourlyRate(e.target.value)}/></td>:<td>{this.state.hourlyRate}</td> }
				<td>{this.state.assign}</td>
				<td>{this.state.editing ? <Input value={this.state.roleRequirements} onChange={e=>this.editRoleRequriements(e.target.value)}/> :this.state.roleRequirements }</td>
				<td>
					{ this.state.editing ?
							<span>
								<Button name="saveName" onClick={()=>this.saveJobRole()} style={{display:'inline-block', marginRight:5}} className="btn-default">
									<i className="fa fa-check"></i>
								</Button>
								<Button name="deleteJobRole" onClick={()=>this.deleteJobRole()} style={{display:'inline-block'}} className="btn-danger">
									<i className="fa fa-trash-o"></i>
								</Button>
							</span> : <Button className="btn-default" onClick={()=>this.editJobRole()}>
							<i className="fa fa-edit"></i>
						</Button>
					}
				</td>
			</tr>
		);
	}

}


export default JobRole;