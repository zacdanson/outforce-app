
import {
	loadingAnimation
} from '../main_actions';
const moment = require('moment');

export const getWorkTypes = (userId, companyId) => {
	return async dispatch=>{
		getEmployerWorkTypes(userId, companyId).then(data=>{

		});
	};
};

export const getWorkLogs = (userId, companyId, currentData) => {
	return dispatch => {
		getAllWorkLogs(companyId).then(logs=>{
			dispatch(updateWorkDataObject('workLogs', logs, currentData));
			dispatch(loadingAnimation(false));
		});
	};
};

export const updateWorkTypes = (userId, companyId, workTypes, currentData) => {
	return dispatch => {
		updateEmployerWorkTypes(userId, companyId, workTypes).then(result=>{
			if(result.success){
				console.log('successfully updated worktypes');
				dispatch(getWorkTypes(userId, companyId, currentData));
			} else {
				console.log(result.error);
			}
		});
	};
};

export const deleteWorkType = (userId, companyId, workTypeId, currentData) => {
	return dispatch =>{
		deleteWorkTypeById(userId, companyId, workTypeId).then(result=>{
			if(result.success){
				console.log('successfully deleted worktype');
				dispatch(getWorkTypes(userId, companyId, currentData));
			} else {
				console.log(result.error);
			}
		});
	}
};

export const updateWorkDataObject = (property, value, currentObject) => {
	let newObject = {...currentObject};
	newObject[property] = value;
	return {
		type:'UPDATE_WORKDATA_OBJECT',
		payload: newObject
	};
};



export const removeLog = (contractorId, companyId, logId, currentData) => {
	return (dispatch)=> {

		swal({
			title: "Are you sure?",
			text: "Are you sure that you want to remove this log?",
			icon: "warning",
			buttons:true,
			dangerMode: true,
		}).then(willDelete => {
			dispatch(loadingAnimation(true));
			if (willDelete) {
				deleteLog(contractorId, companyId, logId).then(res=>{

					dispatch(getWorkLogs(contractorId, companyId, currentData));
				});
			} else {
				dispatch(loadingAnimation(false));
			}
		});
	};
};

export const getWorkDataBetween = (companyId, start, end) =>{
	return dispatch => {
		getWorkLogsRange(companyId, start, end).then(result=>{
				dispatch(updateEmployerDashboard('loggedWork', {workLogs: result, from:start, to: end}));
		});
	};
};

const updateDashboardData = (dashboardObject) => {
	return {
			type: 'UPDATE_DASHBOARD_DATA',
			payload: dashboardObject
	};
};


const getContractorDashboardData = async (companyId) => {
	let time = 0;
	let lastCon = ''
	let contractorCount = 0;
	let contractorList = [];
	let topPerformer = '';
	let start = moment().startOf('month');
	let end = moment().endOf('month');
	let months = [];

	await getAllContractors('', companyId).then(res=>{

		contractorCount = res.length;
		contractorList = _.orderBy(res, ['workData'], ['desc']);
		topPerformer = _.orderBy(res, ['dailySessions'], ['desc']);

		for(let i = 0; i<6; i++){
			months[i] = {
				month: moment(start).format('MMM'),
				start: moment(start).format('x'),
				end: moment(end).format('x')
			};
			start = moment(start).subtract(1, 'month');
			end = moment(start).endOf('month');
		}

		_.each(res, contractor=>{

			_.each(months, month=>{
				month.contractors = month.contractors || [];
				month.numContractors = month.numContractors || 0;
				if(contractor.dateAdded > month.start &&  contractor.dateAdded < month.end ){
					month.contractors.push(contractor);
					month.numContractors+=1;
				}
			});
			console.log('months');

			if(contractor.dateAdded > time){
				time = contractor.dateAdded;
				lastCon = contractor;
			}
		});
	});

	return { time, lastCon, contractorCount, contractorList, topPerformer, months};
};

export const updateLogWorkType = (logId, workTypeId, companyId) => {
	return (dispatch)=>{
		updateLog(logId, workTypeId, companyId).then(res=>{
			console.log('updated work type');
		});
	};
};

export const updateGlobalWorkName = (companyId, workName) => {
	return (dispatch) => {
		updateEmployerGlobalWorkName(companyId, workName).then(res=>{
			if(!res.error){

			}
		});
	};
};


export const getContractors = (userId, companyId) => {
	return(dispatch)=>{
		getAllContractors(userId, companyId).then(res=>{
			dispatch(updateContractorsList(res));
			dispatch(loadingAnimation(false));
			return res;
		});
	}
};

export const updateContractorsList = (contractors) => {
	return {
		type: 'UPDATE_CONTRACTORS_LIST',
		payload: contractors
	};
};


export const workTypeSummary = async (companyId) => {

		let workTypes = [];
		let workLogs = [];

		await getEmployerWorkTypes('', companyId).then(result=>{
			workTypes = result;
		});

		await getAllWorkLogs(companyId).then(result=>{
			workLogs = result;
		});


		_.each(workTypes, type=>{
			type.value=0;
			type.label = type.workType;
			_.each(workLogs, log=>{
				if(type.workTypeId === log.workTypeId){
					type.value+=1;
				}
			});
		});

		return workTypes;
};

export const getGlobalWorkName = (companyId, currentData) => {
	return async dispatch =>{
		getEmployerGlobalWorkName(companyId).then(res=>{
			dispatch(updateWorkDataObject('globalWorkName', res.globalWorkName, currentData));
		});
	};
};

export const getEmployerWorkData = (companyId, currentDataObject) => {
	return async dispatch =>{
		let newDataObject = { ...currentDataObject };

		await getEmployerGlobalWorkName(companyId).then(res=>{
			newDataObject.globalWorkName = res.globalWorkName;
		});
		await getEmployerWorkTypes('',companyId).then(data=>{
			newDataObject.workTypes = data;
		});
		await getAllWorkLogs(companyId).then(logs=>{
			newDataObject.workLogs = logs;
		});
		await getAllContractors('',companyId).then(contractors=>{
			newDataObject.contractors = contractors;
		});

		dispatch(updateWorkDataObject('', '', newDataObject));
		dispatch(loadingAnimation(false));
	};
};