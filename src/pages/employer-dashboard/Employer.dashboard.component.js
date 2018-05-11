import { Component } from 'react';
import { connect } from 'react-redux';
import {
	Contractors,
	ContractorsSummary,
	WorkLogs,
	WorkLogsSummary,
	FinanceTotals,
	PayPeriodSummary,
	TotalProfits,
	TotalRevenue
} from '../../components/employer-dashboard';
import WorkDataActions from '../../actions/WorkDataActions';
import EmployerDataActions from '../../actions/EmployerDataActions'
import CompanyDataActions from '../../actions/CompanyDataActions';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		selectedTab: store.main.selectedTab,
		workLogs:store.firebaseData.workLogs,
		workTypes:store.firebaseData.workTypes,
		contractors:store.firebaseData.contractors,
		globalWorkName: store.firebaseData.globalWorkName,
		payPeriod: store.firebaseData.currentPayPeriod,
		payPeriods: store.company.payPeriodsToDate,
		invoiceTotals: store.company.invoiceTotals,
		financeOverview: store.company.financeOverview
	}
})

export class EmployerDashboard extends Component {

		constructor(props){
			super(props);

		}

		componentDidMount(){

			console.log(' --------- EMPLOYER DASH ----------- ', this.props.user);
			this.props.dispatch(WorkDataActions.getWorkTypes(this.props.user.uid, this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkLogs(this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkName(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getContractors(this.props.user.uid, this.props.user.companyId));
			this.props.dispatch(CompanyDataActions.payPeriodsToDate(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getFinanceTotals(this.props.user.companyId, 'week'));

		}

    render() {
			return (
				<div className={this.props.sidebar === 'max' ? 'home-content home-content-max employer-dashboard' : 'home-content home-content-min employer-dashboard' }>
					<div className="row">

						<div className="col">
							<div className="row">
								<div className="col-sm-6">
									<WorkLogs
										workLogs={this.props.workLogs}
										globalWorkName={this.props.globalWorkName}
									/>
								</div>
								<div className="col-sm-6">
									<Contractors
										contractors={this.props.contractors}
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-sm-6">
									<TotalRevenue
										payPeriods={this.props.payPeriods}

									/>
								</div>
								<div className="col-sm-6">
									<TotalProfits
										payPeriods={this.props.payPeriods}
									/>
								</div>
							</div>
							<div style={{margin:'0 15px'}}>
								<FinanceTotals
									financeOverview={this.props.financeOverview}
									getFinanceTotals={(range)=>this.props.dispatch(EmployerDataActions.getFinanceTotals(this.props.user.companyId, range))}
								/>
							</div>
						</div>


						<div className="col">
							<div className="col">
								<WorkLogsSummary
									workLogs={this.props.workLogs}
									workTypes={this.props.workTypes}
									globalWorkName={this.props.globalWorkName}
								/>
								<ContractorsSummary
									contractors={this.props.contractors}
								/>
								<PayPeriodSummary
									payPeriod={this.props.payPeriod}
									invoiceTotals={this.props.invoiceTotals}
									getInvoicesTotal={(from, to)=>this.props.dispatch(EmployerDataActions.calculateTotalInvoices(this.props.user.companyId, from, to))}
								/>
							</div>
						</div>

					</div>

				</div>
			);

    }
}

export default EmployerDashboard;