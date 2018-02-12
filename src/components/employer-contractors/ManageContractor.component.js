import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Input,
	Modal,
	Tabs,
	Card
} from '../elements'

import { WorkData } from './WorkData.component';
import { PersonalInformation } from './PersonalInformation.component';
import { JobDetails } from './JobDetails.component';
import { WorkLogs } from '../work-logs/WorkLogs.component';
import Loader from '../loading-animation/Loader.component';
import {
	getWorkTypes
} from '../../actions/employer-data-actions/employer-data';
import {
	getContractor,
	saveContractor,
	updateContractorObject,
	updateWorkDataForm,
	updateSelectedDuration,
	updateWorkType,
	addWorkData
} from '../../actions/user-contractors-actions/handle-contractors';

import { loadingAnimation } from '../../actions/main_actions';
import moment from 'moment';
import swal from 'sweetalert';
import { db } from '../../../firebase-config.js'

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		contractor: store.contractor.contractorObject,
		loadingAnimation: store.main.loadingAnimation,
		workDataForm: store.employer.workDataForm,
		selectedDuration: store.employer.selectedDuration,
		workDataObject: store.employer.workDataObject,
		updateContractorWorkLogs: store.contractor.workLogs
	}
})



class ManageContractor extends Component {

	constructor(props){
		super(props);
		this.vm = this;
		console.log('props - ', this.props);
	}

	componentWillMount(){
		let id = this.props.match.params.id;
		this.props.dispatch(loadingAnimation(true));
		this.props.dispatch(getWorkTypes(this.props.user.userId, this.props.user.companyId));
		this.props.dispatch(getContractor(id, ()=>{
				this.handleListener(false, id);
		}));
	}

	handleListener(off, id){
		let listener;
		console.log(off, id);
		if(!listener){
				listener = db.collection('users').doc(id).collection('workData').onSnapshot(doc=>{
				this.props.dispatch(getContractor(id, ()=>{
					console.log('here');
				}));
			});
			if(off){
				listener();
				console.log('listener off.');
			}
		}
	}

	componentWillUnmount(){
		this.handleListener(true, this.props.match.params.id);
	}

	handleSelectedDate(date){
		console.log(moment(date+' '+this.props.selectedDuration.start, 'DD-MM-YYYY, H:mm:ss'));
		this.props.dispatch(updateWorkDataForm('dateWorked', date));

	}

	handleDuration(type, time){
		this.props.dispatch(updateSelectedDuration(time, type)) ;
	}

	handleWorkType(element){
		this.props.dispatch(updateWorkDataForm('workType', element.target.value));
	}


	updateContactorProperty(property, element){
		let details = {...this.props.contractor.details};
		details[property] = element.target.value;
		console.log(details);
		this.props.dispatch(updateContractorObject('details', details));
	}

	saveContractorObject(){
		this.props.dispatch(saveContractor(this.props.contractor.details));
	}



	addWorkData(){
		this.props.dispatch(loadingAnimation(true));
		let startDate = this.props.workDataForm.dateWorked;
		let start = moment(this.props.selectedDuration.start, 'H:mm:s');
		let end = moment(this.props.selectedDuration.end, 'H:mm:s');
		startDate.hour(start.get('hour'));
		startDate.minutes(start.get('minutes'));
		let endDate = startDate.clone();
		endDate.hour(end.get('hour'));
		endDate.minutes(end.get('minutes'));
		let total = endDate.diff(startDate, 'minutes');


		if(isNaN(total)){
			swal({
				title: 'error adding work data',
				text: 'make sure a from/to time is selected.',
				icon: "error",
				buttons:false,
				timer:3000,
				className: 'swal-custom-padding'

			});
			this.props.dispatch(loadingAnimation(false));
		} else if(total < 0 ) {
			swal({
				title:'error adding work data',
				text: 'make sure the from time is before the to time. If from is the day before, logg two days.',
				icon: "error",
				buttons:false,
				timer:3500,
				className: 'swal-custom-padding'

			});
			this.props.dispatch(loadingAnimation(false));
		} else {
			$('#addWorkData').modal('toggle');
			this.props.dispatch(
				addWorkData(
					this.props.contractor.details.companyId,
					total,
					startDate.format('X'),
					endDate.format('X'),
					this.props.workDataForm.workType,
					this.props.contractor.details.uid,
					this.props.contractor.details.linkActive
				)
			);
		}

	}

	render(){
		return(
			<div  className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				{this.props.loadingAnimation ? <Loader size="small"/> : '' }
				<Button
					className="btn-secondary backBtn"
					icon={<i className="fa fa-backward"></i>}
					text=" back"
					onClick={()=>this.props.history.push('/index/employer/employer-contractors')}
				/>
				<Tabs
						horizontal={true}
						tabs={[
							{
								name: 'CONTRACTOR DETAILS',
								active: true
							},
						{
							name: 'WORK LOGS'
						},
						{
							name: 'INVOICES'
						}
					]}>

						<PersonalInformation contractor={this.props.contractor.details} updateProperty={this.updateContactorProperty.bind(this)} onSave={this.saveContractorObject.bind(this)}/>

						<div className="row">
							<Card color="blue" cardHeader={this.props.contractor.details.fullName + "'s Work Logs"}
										headerIcon={
											<div style={{float: 'right'}}>
												<Button
													name="upload-work-data"
													text=" Upload Work Data"
													icon={<i className="fa fa-upload"></i>}
													openModal="true"
													modalName="uploadWorkDataModal"
													size="small"
													style={{float:'right'}}
													className="btn btn-yellow"/>
												<Button
													name="add-work-data"
													text=" Add Work Data"
													icon={<i className="fa fa-plus"></i>}
													openModal="true"
													modalName="addWorkData"
													style={{float:'right', marginRight:10}}
													size="small"
													className="btn btn-success"/>
											</div>
										}
								className="col">
								<WorkLogs logs={this.props.contractor.workLogs} workTypes={this.props.workDataObject.workTypes} dispatch={this.props.dispatch} />
							</Card>

							<Modal
								name="addWorkData"
								titleIcon={<i className="fa fa-key"></i>}
								modalTitle="Upload Work Data"
								closeBtn={true}
								rightBtn={
									<Button
										className="btn-success add-work-data-btn"
										icon={<i className="fa fa-plus"></i>}
										text=" add"
										onClick={this.addWorkData.bind(this)}
									/>
								}
							>
								<WorkData
									handleWorkType={this.handleWorkType.bind(this)}
									workTypes={this.props.workDataObject.workTypes || [] }
									dateSelected={ this.props.workDataForm.dateWorked ? moment(this.props.workDataForm.dateWorked) : moment() }
									dateOnChange={this.handleSelectedDate.bind(this)}
									startTime = {this.props.selectedDuration ? this.props.selectedDuration.start : moment('9.00').format('LT')}
									startTimeChange={this.handleDuration.bind(this, 'start')}
									endTime={this.props.selectedDuration ? this.props.selectedDuration.end : moment('9.00').format('LT') }
									endTimeChange={this.handleDuration.bind(this, 'end')}

								/>

							</Modal>
						</div>



				</Tabs>
				<Modal
					name="uploadWorkDataModal"
					titleIcon={<i className="fa fa-key"></i>}
					modalTitle="Upload Work Data"
					closeBtn={true}
				>
					<div>
						<p className="add-contractor-modal-info">The following API key can be used to interact with the OutForce API, which will automatically add work data to your company.</p>
						<p>This API key, should only be used for this account, and will be linked to your company. Click here to read the API documentation. </p>
						<div className="form-group">
							<Input name="userApiKey" className="work-data-api-key" value={this.props.user ? this.props.user.apiKey : 'no api key found.' }/>
						</div>
					</div>
				</Modal>
			</div>
		);

	}



}

export default ManageContractor;