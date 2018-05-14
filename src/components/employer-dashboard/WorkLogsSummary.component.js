import { Component } from 'react';
import {
	DashboardCard
} from '../index';
import {
	Button
} from '../elements';
import AnnotatedMeter from 'grommet-addons/components/AnnotatedMeter';
import  DateWidget from '../date-widget/DateWidget.component';
import { NavLink } from 'react-router-dom';
import { formatDuration } from '../../helpers/EmployerData';
import LoadingAnimation from '../loading-animation/LoadingAnimation.component';
class WorkLogsSummary extends Component {

	constructor(props) {
		super(props);

		this.state = {
			globalWorkName: this.props.globalWorkName || 'Work',
			workTypes: this.props.workTypes || [],
			workLogs:  this.props.workLogs || [],
			from: moment().startOf('day').format('x'),
			to: moment().endOf('day').format('x'),
			range: 'day',
			ranges: ['day','week','month'],
			logsBetween: {
				workLogs: [],
				totalDuration: 0
			},
			loading: true
		};

	}

	componentWillMount(){
		this.getWorkLogsBetween(this.state.from, this.state.to, this.state.workLogs);
	}

	updateRange(range){
		let start = this.state.from;
		let end = this.state.to;

		start = moment(start, 'x').startOf(range).format('x');
		end = moment(start, 'x').endOf(range).format('x');
		this.setState({
			range
		});
		this.getWorkLogsBetween(start, end, this.state.workLogs );
	}

	getWorkLogsBetween(from, to, logs){
		let workLogs = [];
		let totalDuration = 0;

		_.each(logs, (log, index)=>{
			if(log.start >= from && log.start <= to){
				totalDuration+= parseFloat(log.duration);
				workLogs.push(log);
			}
		});
		this.setState({
			from,
			to,
			logsBetween:{
				workLogs,
				totalDuration
			}
		});

	}

	updateDates(direction){
		let start, end;
		start = direction === 'next' ? moment(this.state.from, 'x').add(1, this.state.range).format('x') :  moment(this.state.from, 'x').subtract(1, this.state.range).format('x');
		end = moment(start, 'x').endOf(this.state.range).format('x');
		this.getWorkLogsBetween(start, end, this.state.workLogs);
	}

	getWorkTypeStats(workTypes){

		_.each(workTypes, type=>{
			type.value=0;
			type.label = type.workType;
			_.each(this.state.workLogs, log=>{
				if(type.workTypeId === log.workTypeId){
					type.value+=1;
				}
			});
		});

		return workTypes;

	}

	render(){
		return(
			<DashboardCard
				type="summary"
				header={ this.state.globalWorkName +'\'s Summary' || 'Work Logs\'s '+ " Summary"}
				headerIcon="fa-briefcase"
				headerTools={
					<DateWidget
						updateDates={(direction)=>this.updateDates(direction)}
						from={this.state.from}
						to={this.state.to}
						key="2"
					/>
				}
				content={
					<div className="card-ranges-buttons">
						{this.state.ranges.map((range, index) => {
							return(<div key={index} className={range === this.state.range ? "card-ranges-button selected" : "card-ranges-button"} onClick={()=>this.updateRange(range)}>{range}</div>);
						})}
					</div>
				}
				items={[
					{name:"Number Of " + this.state.globalWorkName || 'Work' + "'s ", figure: this.state.logsBetween.workLogs.length},
					{name:'Total Hours Worked', figure: formatDuration(this.state.logsBetween.totalDuration) }
				]}
			/>
		);
	};
}

export default WorkLogsSummary;