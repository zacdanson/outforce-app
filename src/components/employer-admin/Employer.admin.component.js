import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Tabs,
	Card,
	Input,
	Button
} from '../elements';
import WorkInformation from './work-information/WorkInformation.component';
import { WorkLogs } from '../work-logs/WorkLogs.component';
import Loader from '../loading-animation/Loader.component';
import {EmployerContractorsList} from '../employer-contractors-list/EmployerContractorsList.component';
import {
	getWorkTypes,
	updateWorkTypes,
	deleteWorkType,
	getWorkLogs,
	updateWorkDataObject,
	updateGlobalWorkName,
	getGlobalWorkName
} from '../../actions/employer-data-actions/employer-data';
import { getContractors } from '../../actions/employer-data-actions/employer-data';


@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		workDataObject: store.employer.workDataObject,
		loadingAnimation: store.main.loadingAnimation,
		contractors: store.employer.contractors
	}
})

export class EmployerAdmin extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
			this.props.dispatch(getWorkTypes(this.props.user.userId, this.props.user.companyId));
			this.props.dispatch(getWorkLogs(this.props.user.userId, this.props.user.companyId));
			this.props.dispatch(getContractors(this.props.user.userId, this.props.user.companyId));
			this.props.dispatch(getGlobalWorkName(this.props.user.companyId));
			console.log(this.props);

		}

		updateWorkTypes(workTypes){
			console.log(workTypes);
			this.props.dispatch(updateWorkTypes(this.props.user.userId, this.props.user.companyId, workTypes));
		}

		deleteWorkType(workTypeId){
			console.log(workTypeId);
			this.props.dispatch(deleteWorkType(this.props.user.userId,this.props.user.companyId, workTypeId));
		}

		saveGlobalWorkName(){
			this.props.dispatch(updateGlobalWorkName(this.props.user.companyId, this.props.workDataObject.globalWorkName));
		}

		updateWorkDataObject(e){
			this.props.dispatch(updateWorkDataObject('globalWorkName', e.target.value));
		}

    render() {
			let workName = this.props.workDataObject.globalWorkName !== undefined ? this.props.workDataObject.globalWorkName : 'Work';
        return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
							{this.props.loadingAnimation ? <Loader size="small"/> : '' }
								<Tabs
									horizontal={true}
									tabs={[
										{
											name: workName.toUpperCase() + ' INFO',
											active: true
										},
										{
											name: workName.toUpperCase() + ' LOGS'
										},
										{
											name: 'CONTRACTORS'
										},
										{
											name: 'INVOICES'
										}
									]}
								>

									<WorkInformation
										user={this.props.user}
										workDataObject={this.props.workDataObject}
										updateWorkTypes={this.updateWorkTypes.bind(this)}
										deleteWorkType={this.deleteWorkType.bind(this)}
										updateWorkDataObject={this.updateWorkDataObject.bind(this)}
										saveGlobalWorkName={this.saveGlobalWorkName.bind(this)}
										workName={workName}
									/>

									<Card cardHeader={'All Logged Work'}>
										<WorkLogs  logs={this.props.workDataObject.workLogs} workTypes={this.props.workDataObject.workTypes} dispatch={this.props.dispatch}/>
									</Card>

									<Card cardHeader={'All Contractors'}>
										<EmployerContractorsList
											hideCheckBox={true}
											user={this.props.user}
											contractors={this.props.contractors}
											onSelectUser={()=>{}}
											onDoubleClick={()=>{}}
											selectAllUsers={()=>{}}
										/>
									</Card>

								</Tabs>
            </div>

        );
    }
}

export default EmployerAdmin;