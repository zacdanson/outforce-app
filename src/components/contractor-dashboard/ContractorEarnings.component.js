import { Component } from 'react';
import ContractorDataActions from '../../actions/ContractorDataActions';
import DashboardCard from '../dashboard-card/DashboardCard.component';




class ContractorEarnings extends Component{
	constructor(props){
		super(props);
	}


	render() {
		return (
			<DashboardCard
				className="full-height"
				contentClassName="full-height"
				name={"Earned This Pay Period"}
				color="1"
				figure={this.props.payPeriodStats.earned ? '£' + this.props.payPeriodStats.earned : '£'+0}
				loading={this.props.loading}
			/>
		);
	}
};

export default ContractorEarnings;