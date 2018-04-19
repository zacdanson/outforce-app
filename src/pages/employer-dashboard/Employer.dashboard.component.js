import { Component } from 'react';
import { connect } from 'react-redux';
import {
	Contractors,
	ContractorsSummary,
	WorkLogs,
	WorkLogsSummary
} from '../../components/employer-dashboard';
import WorkDataActions from '../../actions/WorkDataActions';
import EmployerDataActions from '../../actions/EmployerDataActions'

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		selectedTab: store.main.selectedTab,
		workLogs:store.firebaseData.workLogs,
		workTypes:store.firebaseData.workTypes,
		contractors:store.firebaseData.contractors,
		globalWorkName: store.firebaseData.globalWorkName,
		payPeriod: store.firebaseData.currentPayPeriod
	}
})

export class EmployerDashboard extends Component {

		constructor(props){
			super(props);
			console.log('dash props - ', this.props);
		}

		componentWillMount(){
			this.props.dispatch(WorkDataActions.getWorkTypes(this.props.user.uid, this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkLogs(this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkName(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getContractors(this.props.user.uid, this.props.user.companyId));
		}

    render() {

			return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max employer-dashboard' : 'home-content home-content-min employer-dashboard' }>
							<div className="row">
								<div className="col-lg-3">
									<WorkLogs
										workLogs={this.props.workLogs}
										globalWorkName={this.props.globalWorkName}
									/>
								</div>
								<div className="col-lg-3">
									<Contractors
										contractors={this.props.contractors}
									/>
								</div>
								<div className="col-lg-6">
									<WorkLogsSummary
										workLogs={this.props.workLogs}
										workTypes={this.props.workTypes}
										globalWorkName={this.props.globalWorkName}
									/>
									<ContractorsSummary
										contractors={this.props.contractors}

									/>
								</div>
							</div>

            </div>
        );
    }
}

export default EmployerDashboard;