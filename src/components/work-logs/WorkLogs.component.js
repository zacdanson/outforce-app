import React, { Component } from 'react';
import { Input, Button } from '../elements';
import { Select } from 'grommet';
import { WorkLogListItem } from './WorkLogListItem.component';

const buttons = {
	container: {
		display:'flex',
		width:'100%',
		justifyContent:'flex-end'
	},
	arrowBtn: {
		background: '#ebebeb',
		float:'right',
		marginTop:'20px'
	}
};


let types = [];

class  WorkLogs extends Component {


	constructor(props){
		super(props);
		this.state = {
			display:0
		};
	}

	displayNext(){
		let display = this.state.display;
		this.setState({display: display+=10});
	}
	
	displayPrev(){
		let display = this.state.display;
		this.setState({display: display-=10});
	}
	

	componentWillMount(){
		_.each(this.props.workTypes, (type, index)=>{
			types[index] = {
				label: type.workType,
				value: type.workTypeId
			};
		});
	}

	render(){
		let logs = _.orderBy(this.props.logs, ['start'],['desc']);
		return (
			<div>
				{ logs.length > 0 ?
					<table className="table">
						<thead>
						<tr>
							<th scope="col">Duration</th>
							<th scope="col">Date</th>
							<th scope="col">Work Type</th>
							<th scope="col"></th>
						</tr>
						</thead>
						<tbody className="panel-body">
						{logs.map((log, index)=>{
							console.log('index - ', index, ' display - ', this.state.display);
							if(index>= this.state.display && index<= this.state.display+10){
								return (<WorkLogListItem
										key={index}
										index={index}
										log={log}
										types={types}
										removeLog={(contractorId, logId)=>this.props.removeLog(contractorId, logId)}
										updateLog={(logId, workTypeId)=>this.props.updateLog(logId, workTypeId)}
								/>);
							}
						})
						}
					</tbody>
					</table> : <div style={{textAlign:'center'}}> No Logs </div> }

					<div style={buttons.container}>
							{ 
								this.state.display === 0 || logs.length === 0 ? '' :
								<Button
									className="date-widget-arrow"
									style={buttons.arrowBtn}
									name="prev"
									onClick={() => this.displayPrev()}
									icon={<i className="fa fa-arrow-left" />}
							/> }
							{ 
								this.state.display+10 >= logs.length || logs.length === 0 ?  '' :
								<Button
								className="date-widget-arrow"
								style={buttons.arrowBtn}
								name="next"
								onClick={() => this.displayNext()}
								icon={<i className="fa fa-arrow-right" />}
							/> }
					</div>
			</div>
		);	
	}
};


export default WorkLogs;