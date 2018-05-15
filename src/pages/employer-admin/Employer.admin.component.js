import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Tabs,
	Card,
	Input,
	Button
} from '../../components/elements';
import Loader from '../../components/loading-animation/Loader.component';
import WorkDataActions from '../../actions/WorkDataActions';
import EmployerDataActions from '../../actions/EmployerDataActions';
import CompanyDataActions from '../../actions/CompanyDataActions';

import { WorkLogs, EmployerContractorsList } from '../../components';
import  JobRoles from '../../components/employer-admin/job-roles/JobRoles.component';
import {
	WorkInformation,
	Invoices,
	CompanyDetails
} from '../../components/employer-admin/index';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		loading: store.main.loading,
		contractors: store.firebaseData.contractors,
		workTypes: store.firebaseData.workTypes,
		workLogs: store.firebaseData.workLogs,
		jobRoles: store.firebaseData.jobRoles,
		companyData: store.firebaseData.companyData,
		payPeriod: store.firebaseData.currentPayPeriod
	}
})

export class EmployerAdmin extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
			this.props.dispatch(WorkDataActions.getWorkTypes(this.props.user.uid, this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkLogs(this.props.user.companyId));
			this.props.dispatch(WorkDataActions.getWorkName(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getContractors(this.props.user.uid, this.props.user.companyId));
			this.props.dispatch(CompanyDataActions.getJobRoles(this.props.user.companyId));
			this.props.dispatch(EmployerDataActions.getAssignCondition(this.props.user.companyId));
			this.props.dispatch(CompanyDataActions.getCompanyData(this.props.user.companyId));
		}


    render() {			
				let tabs = [
					{
						name: this.props.companyData && this.props.companyData.globalWorkName ? this.props.companyData.globalWorkName.toUpperCase() + ' INFO' : 'INFO',
						url: '/work-info',
						active: this.props.match.params.tab === 'work-info'
					},
					{
						name: this.props.companyData && this.props.companyData.globalWorkName ? this.props.companyData.globalWorkName.toUpperCase() + ' LOGS' : 'LOGS',
						url: '/work-logs',
						active: this.props.match.params.tab === 'work-logs'
					},
					{
						name: 'JOB ROLES',
						url: '/job-roles',
						active: this.props.match.params.tab === 'job-roles'
					},				
					{
						name: 'COMPANY DETAILS',
						url: '/company-details',
						active: this.props.match.params.tab === 'company-details'
					}
				];
        return (			
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
							{this.props.loading ? <Loader size="small"/> : '' }
								<Tabs
									horizontal={true}
									baseUrl="/index/employer/employer-admin"
									tabs={tabs}
								>
									<div className="col">
									{  tabs[0].active ?
									<WorkInformation
										payPeriod={this.props.payPeriod}
										company={this.props.companyData}
										updatePayPeriodDetails={(selectedPayFrequency)=>this.props.dispatch(CompanyDataActions.updatePayPeriodDetails(selectedPayFrequency, this.props.user.companyId))}
										user={this.props.user}
										globalWorkName={this.props.companyData.globalWorkName || 'Work Logs' }
										workLogs={this.props.workLogs}
										workTypes={this.props.workTypes}
										updateWorkType={(workTypeId, workType, duration)=>this.props.dispatch(WorkDataActions.updateWorkType(this.props.user.companyId, workTypeId, workType, duration))}
										createWorkType={(workTypeId, workType)=>this.props.dispatch(WorkDataActions.createWorkType(this.props.user.companyId, workTypeId, workType))}
										updateGlobalWorkName={(globalWorkName)=>this.props.dispatch(WorkDataActions.updateGlobalWorkName(this.props.user.companyId, globalWorkName))}
										deleteWorkType={(workTypeId)=>this.props.dispatch(WorkDataActions.deleteWorkType(this.props.user.companyId, workTypeId))}
									/> : ''}
									{ tabs[1].active  ?
										<Card cardHeader={'All Logged Work'}>
											<WorkLogs
												logs={this.props.workLogs}
												workTypes={this.props.workTypes}
												removeLog={(contractorId, logId) => this.props.dispatch(WorkDataActions.deleteWorkLog(contractorId, this.props.user.companyId, logId))}
												updateLog={(logId, workTypeId) => this.props.dispatch(WorkDataActions.updateWorkLog(logId, workTypeId, this.props.user.companyId))}
											/>
										</Card> : ''}
									{ tabs[2].active ?
												<JobRoles
													updateAssignCondition={(assignCondition)=>this.props.dispatch(EmployerDataActions.updateAssignCondition(this.props.user.companyId, assignCondition))}
													assignCondition={this.props.assignCondition}
													globalWorkName={this.props.companyData.globalWorkName || ''}
													deleteJobRole={(jobRole)=>this.props.dispatch(EmployerDataActions.deleteJobRole(jobRole, this.props.user.companyId))}
													user={this.props.user}
													jobRoles={this.props.jobRoles}
													saveJobRole={(jobRole)=>this.props.dispatch(EmployerDataActions.saveJobRole(jobRole, this.props.user.companyId))}
													addJobRole={(name, hourlyRate)=>this.props.dispatch(EmployerDataActions.addJobRole(name, hourlyRate, this.props.user.companyId))}
												/> : ''}								
									{ tabs[3].active ?
										<CompanyDetails
											loading={this.props.loading}
											companyDetails={this.props.companyData}
											saveCompanyDetails={(companyDetails)=>this.props.dispatch(CompanyDataActions.updateCompanyDetails(companyDetails))}
											uploadCompanyLogo={(companyId, file, filename)=>this.props.dispatch(CompanyDataActions.uploadCompanyLogo(companyId, file, filename))}
										/>
									  : ''}
									</div>
								</Tabs>
            </div>

        );
    }
}

export default EmployerAdmin;