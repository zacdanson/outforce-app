import { Component } from 'react';
import {
	Card,
	Input,
	Button
} from '../../elements';

class AddJobRole extends Component {

	constructor(props){
		super(props);
		this.state = ({
			name: '',
			hourlyRate: '',
		});
	}

	render(){
		return(
				<Card cardHeader={'Add Job Role'} >
					<small> Job Roles Can Be Attached To Contractors To Determine Pay.</small>
					<div className="row" style={{paddingTop:'20px'}}>
						<div className="col">
							<label>Name</label>
							<br/>
							<Input value={this.state.name} placeholder="name" onChange={(e)=>this.setState({name: e.target.value})} />
						</div>
						<div className="col">
							<label>Hourly Rate</label>
							<br/>
							<Input value={this.state.hourlyRate} placeholder="hourly rate" onChange={(e)=>this.setState({hourlyRate: e.target.value})} />
							<br/>
							<Button  text='Save Job Role'  className='btn-success pull-right' onClick={()=>this.props.addJobRole(this.state.name, this.state.hourlyRate)}/>
						</div>
					</div>
				</Card>
		);
	}
};

export default AddJobRole;