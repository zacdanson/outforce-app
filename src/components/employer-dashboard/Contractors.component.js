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

class Contractors extends Component{

	constructor(props){
		super(props);

		this.state = {
			contractors: this.props.contractors
		};

	}

	render(){
		return(
			<DashboardCard
				name={"Total Contractors"}
				figure={getContractorCount(this.state.contractors)}
				color="1"
			>
				<ResponsiveContainer width="100%" height={75}>
					<LineChart data={getSixMonthContractorCount(this.state.contractors)} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
						<Line type="monotone" dataKey="numContractors" stroke="#f4516c" strokeWidth="3" dot={true} animationEasing='ease-in'/>
						<Tooltip />
						<XAxis dataKey="month" hide={true} />
					</LineChart>
				</ResponsiveContainer>
			</DashboardCard>
		);
	}

}
export default Contractors;


const getContractorCount = (contractors) =>{
	return contractors.length;
};

const getSixMonthContractorCount = (contractors) => {
	let start = moment().startOf('month');
	let end = moment().endOf('month');
	let months = [];

	for(let i = 0; i<6; i++){
		months.unshift({
			month: moment(start).format('MMM'),
			start: moment(start).format('x'),
			end: moment(end).format('x'),
			contractors: [],
		});
		start = moment(start).subtract(1, 'month');
		end = moment(start).endOf('month');
	}
	_.each(months, month=> {
		month.numContractors = 0;
	_.each(contractors, contractor=>{
			if(contractor.dateAdded > month.start && contractor.dateAdded < month.end ){
				month.contractors.push(contractor);
				month.numContractors+=1;
			}
		});
	});

	return months;
};