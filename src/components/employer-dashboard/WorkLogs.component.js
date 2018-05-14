import { Component } from 'react';
import {
	Line,
	LineChart,
	XAxis,
	Tooltip,
	ResponsiveContainer
} from 'recharts';
import {
	DashboardCard
} from '../index';

class WorkLogs extends Component{

	constructor(props){
		super(props);

		this.state = {
			workLogs: this.props.workLogs || [],
			monthlyChartValues: [],
			globalWorkName: this.props.globalWorkName || 'Work'
		};

	}

	componentWillMount(){
		this.getMonthlyChartValues();
	}

	getMonthlyChartValues(){

			let start = moment().startOf('month');
			let end = moment().endOf('month');
			let months = [];

			for(let i = 0; i<6; i++){
				months[i] = {
					month: moment(start).format('MMM'),
					start: moment(start).format('x'),
					end: moment(end).format('x'),
					logs: [],
				};
				start = moment(start).subtract(1, 'month');
				end = moment(start).endOf('month');
			}
		_.each(months, month=> {
			month.logs = 0;
			_.each(this.state.workLogs, log=>{
					if(log.start > month.start && log.start < month.end ){
						month.logs+=1;
					}
				});
			});

			let monthsOrdered = _.orderBy(months, ['start'], ['asc']);


			this.setState({
				monthlyChartValues: monthsOrdered
			})
	}


	getWorkLogsCount(workLogs){
		return workLogs.length;
	}

	render(){
		return(
			<DashboardCard
				name={"All "+ this.state.globalWorkName +"'s" || 'Work Logs'}
				figure={this.getWorkLogsCount(this.state.workLogs)}
				color="2"
			>
				<ResponsiveContainer width="100%" height={75}>
					<LineChart data={this.state.monthlyChartValues} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
						<Line type="monotone" dataKey="logs" stroke="#00c5dc" strokeWidth="3" dot={true} animationEasing='ease-in'/>
						<Tooltip />
						<XAxis dataKey="month" hide={true} />
					</LineChart>
				</ResponsiveContainer>

			</DashboardCard>
		);
	}

}
export default WorkLogs;


