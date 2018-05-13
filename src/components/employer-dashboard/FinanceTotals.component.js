import { Component } from 'react';
import {
	DashboardCard
} from '../index';
import  DateWidget from '../date-widget/DateWidget.component';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend} from 'recharts' ;



class FinanceTotals extends Component {


	constructor(props){
		super(props);
		this.state = {
			range: 'year',
			ranges: ['week','month','year'],
		};
	}

	updateRange(range){
		this.props.getFinanceTotals(range);
		this.setState({
			range
		});
	}

	componentDidMount(){;
		this.updateRange(this.state.range);
	}



	render(){
		return(
			<DashboardCard type="summary" className="col" header="Profits Overivew"
				 items={[]}
				 key='1'
				 headerTools={
					 <div className="card-ranges-buttons" key="1">
						 {this.state.ranges.map((range, index) => {
							 return(<div key={index} className={range === this.state.range ? "card-ranges-button selected" : "card-ranges-button"} onClick={()=>this.updateRange(range)}>{range}</div>);
						 })}
					 </div>
				 }
				 headerIcon="fa-currency"
				 content={
					 <ResponsiveContainer width="100%" height={250} margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
						 <LineChart data={this.props.financeOverview}>
							 <XAxis dataKey="name" />
							 <YAxis/>
							 <Tooltip />
							 <Legend />
							 <Line type="monotone" dataKey="revenue" stroke="#00c5dc" strokeWidth="3" easeIn={true}/>
							 <Line type="monotone" dataKey="costs" stroke="#f4516c" strokeWidth="3" easeIn={true}/>
							 <Line type="monotone" dataKey="profit" stroke="#716aca" activeDot={{r: 8}} strokeWidth="3" easeIn={true}/>
						 </LineChart>
					 </ResponsiveContainer>
				 }
			/>
		);
	}

}

export default FinanceTotals;