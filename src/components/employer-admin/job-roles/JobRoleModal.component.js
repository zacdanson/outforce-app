import { Component } from 'react';
import {
	Modal,
	Button,
	Input
} from '../../elements';
import {
	Select
} from 'grommet';

class JobRoleModel extends Component {
	constructor(props){
		super(props);
		this.state = ({
			conditions: [{label: 'Number of '+ this.props.globalWorkName +'\'s', value: 'numLogs'},{ label:'Total Hours', value: 'totalHours'}, {label:'Employment Duration', value:'timeEmployed'}],
			selectedCondition: {label: 'Number of '+ this.props.globalWorkName +'\'s', value: 'numLogs'},
		});
	}

	componentWillReceiveProps(nextProps){
		let condition = nextProps.condition;
		let selected ={};
		if(condition){
			if(condition === 'numLogs'){
				selected = this.state.conditions[0];
			} else if (condition === 'totalHours'){
				selected = this.state.conditions[1];
			} else {
				selected = this.state.conditions[2];
			}
			this.setState({
				selectedCondition: selected
			});
			console.log('this state1 - ', selected);
		}
	}

	updateCondition(e){
		this.setState({
				selectedCondition: e.value
			});
		console.log('this state - ', e.value);
	}

	updateJobRoleConditions(){

		this.props.updateAssignCondition(this.state.selectedCondition.value);
		$('#jobRoleModal').modal('toggle');

	}

	render(){

		return(
			<Modal
				name="jobRoleModal"
				titleIcon={<i className="fa fa-file"></i>}
				modalTitle={"Change Job Role Conditions"}
				rightBtn={<Button onClick={()=>this.updateJobRoleConditions()} text="update" size="small" className="btn-success" data-dismiss="addContractorModal"/>}
				rightBtnName='Update'
				rightBtnIcon={<i className="fa fa-check"></i>}
				closeBtn={true}
			>
				<div>
					<small className="job-role-modal-info">Select the conditions which are required for the Contractor to obtain this Job Role.</small>
					<div className="form-group" style={{marginTop:10}}>
						<label>Select Condition</label>
						<br/>
						<Select
							options={this.state.conditions}
							value={this.state.selectedCondition}
							onChange={(e)=>this.updateCondition(e)}
						/>
					</div>
				</div>
			</Modal>
		);
	}
};

export default JobRoleModel;