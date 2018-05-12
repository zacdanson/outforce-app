import { Component } from 'react';
import {
	DashboardCard
} from '../index';
import  DateWidget from '../date-widget/DateWidget.component';

class PayPeriodSummary extends Component {



	constructor(props){
		super(props);

		this.state = {
			from: this.props.payPeriod.start,
			to: this.props.payPeriod.end,
			numPayPeriod: this.props.payPeriod.numPayPeriod,
			loading: true
		};

	}

	componentWillMount(){

		this.props.getInvoicesTotal(this.state.from, this.state.to);
	}

	updateDates(direction){
		let {from, to, numPayPeriod} = this.state;
		if(direction === 'next'){
			from = moment(from, 'x').add(2, 'weeks').format('x');
			numPayPeriod+=1;
		} else {
			from = moment(from, 'x').subtract(2, 'weeks').format('x');
			numPayPeriod-=1;
		}

		to = moment(from, 'x').add(2, 'weeks').subtract(1, 'days').format('x');


		this.getTotal(from, to);

		this.setState({
			from,
			to,
			numPayPeriod
		});

	}

	getTotal(from, to){
		this.props.getInvoicesTotal(from, to);
	}


	render(){
		return(
				<DashboardCard
					type="summary"
					header={ 'Invoice\'s Total' }
					headerIcon="fa-briefcase"
					headerTools={
						<DateWidget
							key="4"
							updateDates={(direction)=>this.updateDates(direction)}
							from={this.state.from}
							to={this.state.to}
						/>
					}
					content={''}
					items={[
						{name:"Pay Period", figure: this.state.numPayPeriod},
						{name:'Total Contractor Payments', figure: '£' + this.props.invoiceTotals }
					]}
				/>
		);
	}
}

export default PayPeriodSummary;