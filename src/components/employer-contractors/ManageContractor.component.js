import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Input
} from '../elements'

import { WorkData } from './WorkData.component';
import { PersonalInformation } from './PersonalInformation.component';
import { JobDetails } from './JobDetails.component';
import { WorkLogs } from './WorkLogs.component';

import Loader from '../loading-animation/Loader.component';
import {
	getUserWorkData
} from '../../helpers/ContractorData';
import {
	setContractor,
	updateSelectedDate,
	updateSelectedDuration,
	updateWorkType,
	addWorkData,
	updateWorkLogs
} from '../../actions/user-contractors-actions/handle-contractors';
import { loadingAnimation } from '../../actions/main_actions';
import moment from 'moment';
import swal from 'sweetalert';


@connect((store)=>{
	return {
		sidebar: store.main.sidebar,
		contractor: store.contractor.contractor,
		loadingAnimation: store.main.loadingAnimation,
		selectedDate: store.contractor.selectedDate,
		selectedDuration: store.contractor.selectedDuration,
		workType: store.contractor.workType,
		workLogs: store.contractor.workLogs
	}
})

class ManageContractor extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.dispatch(loadingAnimation(true));
		let id = this.props.match.params.id;
		console.log(id);
		this.props.dispatch(setContractor(id));
		this.props.dispatch(getUserWorkData(this.props.contractor.companyId, id, (logs)=>{
			this.props.dispatch(updateWorkLogs(logs));
		}));
	}

	handleSelectedDate(date){
		this.props.dispatch(updateSelectedDate(date));
		console.log(moment(this.props.selectedDate));
	}

	handleDuration(type, time){
		console.log(type, time);
		this.props.dispatch(updateSelectedDuration(time, type)) ;
	}

	handleWorkType(element){
		this.props.dispatch(updateWorkType(element.target.value));
	}


	addWorkData(){
		this.props.dispatch(loadingAnimation(true));
		let start = moment(this.props.selectedDuration.start, 'HH:mm');
		let end = moment(this.props.selectedDuration.end, 'HH:mm');
		let total = end.diff(start);

		if(isNaN(total)){
			swal({
				title: 'error adding work data',
				text: 'make sure a from/to time is selected.',
				icon: "error",
				buttons:false,
				timer:3000
			});
			this.props.dispatch(loadingAnimation(false));
		} else if(total < 0 ) {
			swal({
				title:'error adding work data',
				text: 'make sure the from time is before the to time. If from is the day before, logg two days.',
				icon: "error",
				buttons:false,
				timer:3500
			});
			this.props.dispatch(loadingAnimation(false));
		} else {
			this.props.dispatch(
				addWorkData(
					this.props.contractor.companyId,
					this.props.selectedDate,
					total,
					start.format('LT'),
					end.format('LT'),
					this.props.workType,
					this.props.contractor.uid,
					this.props.contractor.linkActive
				)
			);
		}

	}

	render(){

		const m = moment();
		const today = m.date();

		return(
			<div  className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
			{this.props.loadingAnimation ? <Loader size="small"/> :
				<div>
					<Button
						className="btn-secondary backBtn"
						icon={<i className="fa fa-backward"></i>}
						text=" back"
						onClick={()=>this.props.history.push('/index/employer/employer-contractors')}
					/>
					<h2 className="home-content-header" style={{marginTop:5, textAlign:'center'}}>
						{ this.props.contractor ? this.props.contractor.fullName || this.props.contractor.name : '' }
					</h2>

					<div className="contractor-details fluid-container row">

						<JobDetails

						/>

						<PersonalInformation
							name={this.props.contractor.fullName || this.props.contractor.name }
							phoneNumber={this.props.contractor.phoneNumber || ''}
							email={this.props.contractor.email || ''}
							address={this.props.contractor.address || ''}

						/>

				</div>

				<div className="fluid-container row">

					<WorkData
						handleWorkType={this.handleWorkType.bind(this)}
						workType={this.props.workType || ''}
						dateSelected={ this.props.selectedDate ? moment(this.props.selectedDate) : moment() }
						dateOnChange={this.handleSelectedDate.bind(this)}
						startTime = {this.props.selectedDuration ? this.props.selectedDuration.start : moment(0).format('LT')}
						startTimeChange={this.handleDuration.bind(this, 'start')}
						endTime={this.props.selectedDuration ? this.props.selectedDuration.end : moment().format('LT') }
						endTimeChange={this.handleDuration.bind(this, 'end')}
						addWorkData={this.addWorkData.bind(this)}
					/>

					<div className="col-md work-logs-container">
						<h3 className="home-content-header">Work Logs</h3>
						<WorkLogs
							logs={this.props.workLogs || []}
						/>
					</div>

				</div>
				</div>}
			</div>
		);

	}



}

export default ManageContractor;