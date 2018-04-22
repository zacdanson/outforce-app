import { Component } from 'react';
import { Modal, Button, Input } from '../elements';
import { Select } from 'grommet';
import DateTime from 'grommet/components/DateTime';

class AddWorkData extends Component {

	constructor(props){
		super(props);
		this.state = ({
			workTypes: [],
			workType: '',
			workData: {
				start:'',
				end: '',
				total:''
			}
		});
	}

	componentWillMount(){
		let types = [];
		_.each(this.props.workTypes, (type, index)=>{
				types[index] = { value: type.workTypeId, label: type.workType, duration: type.duration };
		});
		this.setState({
			workTypes: types,
			workType: types[0]
		});
	}

	updateWorkData(property, value){
		let workData = this.state.workData;
		workData[property] = value;
		this.setState({
			workData
		});
	}

	updateWorkType(e){
		this.setState({
			workType: e.value
		});
	}


	addWorkData(){
		let workData = {...this.state.workData};
		workData.workTypeId = this.state.workType.value;
		workData.workType = this.state.workType.label;
		workData.duration = this.state.workType.duration;
		workData.start = moment(workData.start, 'M/D/YYYY h:mm a').format('x');
		this.props.addWorkData(workData);
		$('#addWorkData').modal('toggle');
	}


	render(){
		console.log(this.props);
		return(
			<Modal
				name="addWorkData"
				titleIcon={<i className="fa fa-suitcase"></i>}
				modalTitle="Add Work Data"
				rightBtn={<Button name="addWorkData" text="Add Work Data" className="btn btn-success" onClick={()=>this.addWorkData()}/>}
				closeBtn={true}>
				<div>
					<div className="container" style={{paddingTop:20}}>
						<div className="form-group">
							<label style={{width:100}}>Date and Time:</label>
								<DateTime id='id'
													name='name'
													step={5}
													value={this.state.workData.start}
													onChange={(val)=>this.updateWorkData('start', val)}
								/>
						</div>
						<div className="form-group">
							<label style={{width:100}}>WorkType</label>
							<Select
								options={this.state.workTypes}
								value={this.state.workType}
								onChange={(val)=>this.updateWorkType(val)}
							/>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
}

export default AddWorkData;