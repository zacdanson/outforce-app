import React, { Component } from 'react';
import { checkAuth } from '../../actions/auth-actions/auth_actions';
import ContractorDataActions from '../../actions/ContractorDataActions';
import CompanyDataActions from '../../actions/CompanyDataActions';
import { connect } from 'react-redux';
import {
	ContractorEarnings,
	ContractorNumLogs,
	ContractorNextJobRole,
	ContractorAllTimeLogs,
	ContractorDashboardInvoice
} from '../../components/contractor-dashboard';

import { Loading } from '../../actions/main_actions';
import ContractorWorkLogs from '../../components/contractor-dashboard/ContractorWorkLogs.component';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		contractor: store.contractor.contractor,
		payPeriod: store.firebaseData.currentPayPeriod,
		globalWorkName: store.firebaseData.globalWorkName,
		payPeriodStats: store.contractor.payPeriodStats,
		loading: store.main.loading,
		jobRoles: store.firebaseData.jobRoles,
		nextJobRole: store.contractor.nextJobRole,
		workLogs: store.contractor.workLogs,
		invoices: store.contractor.invoices

	}
})


export class ContractorDashboard extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
			this.props.dispatch(ContractorDataActions.getPayPeriodStats(this.props.contractor, this.props.jobRoles, this.props.payPeriod.start, this.props.payPeriod.end));
			this.props.dispatch(ContractorDataActions.nextJobRole(this.props.contractor, this.props.jobRoles));
			
			this.props.dispatch({
				type:"LOADING",
				payload:false
			});
			console.log(this.props);
		}

    render() {
        return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
							<div className="row">
								<div className="col-lg-3">
									<ContractorEarnings
										payPeriodStats={this.props.payPeriodStats}
										contractor={this.props.contractor}
										user={this.props.user}
										payPeriod={this.props.payPeriod}
									/>
								</div>
								<div className="col-lg-3">
									<ContractorNumLogs
										payPeriodStats={this.props.payPeriodStats}
										globalWorkName={this.props.globalWorkName}
									/>
								</div>
								<div className="col-lg-3">
									<ContractorNextJobRole
										nextJobRole={this.props.nextJobRole}
										globalWorkName={this.props.globalWorkName}
									/>
								</div>
								<div className="col-lg-3">
									<ContractorAllTimeLogs
										contractor={this.props.contractor}
										globalWorkName={this.props.globalWorkName}
									/>
								</div>						
							</div>
							<br/>
							<div className="row">
								<div className="col-lg-4">
									<ContractorDashboardInvoice
										invoices={this.props.invoices}
									/>
								</div>
								<div className="col-lg-8">
										<ContractorWorkLogs
											logs={this.props.contractor.workLogs}
											globalWorkName={this.props.globalWorkName}
										/>
								</div>
							</div>								
            </div>
        );
    }
}

export default ContractorDashboard;