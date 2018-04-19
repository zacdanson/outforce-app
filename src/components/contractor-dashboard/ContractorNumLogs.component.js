import { Component } from 'react';
import ContractorDataActions from '../../actions/ContractorDataActions';
import DashboardCard from '../dashboard-card/DashboardCard.component';

class ContractorNumLogs extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}


	render(){
		return(
			<DashboardCard
				name={'Number of '+ this.props.globalWorkName+"'s This Pay Period" || ' Work Logs This Pay Period'}
				color="2"
				className="full-height"
				contentClassName="full-height"
				figure={this.props.payPeriodStats.workLogs.length}
				loading={this.props.loading}
			/>
		);
	}

}

export default ContractorNumLogs;