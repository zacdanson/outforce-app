import {
	getEmployerWorkTypes,
	updateEmployerWorkTypes,
	deleteWorkTypeById,
	getAllWorkLogs,
	getAllContractors,
	deleteLog,
	updateLog,
	getWorkLogsRange,
	getEmployerGlobalWorkName,
	updateEmployerGlobalWorkName,
	sixMonthsWorkLogs
} from '../../helpers/EmployerData';
import {
	loadingAnimation
} from '../main_actions';
const moment = require('moment');

export const getWorkTypes = (userId, companyId) => {
	return dispatch=>{
		getEmployerWorkTypes(userId, companyId).then(data=>{
			console.log('here - ', data);
				dispatch(updateWorkDataObject('workTypes', data));
		});
	};
};

export const getWorkLogs = (userId, companyId) => {
	return dispatch => {
		getAllWorkLogs(companyId).then(logs=>{
			dispatch(updateWorkDataObject('workLogs', logs));
			dispatch(loadingAnimation(false));
		});
	};
};

export const updateWorkTypes = (userId, companyId, workTypes) => {
	return dispatch => {
		updateEmployerWorkTypes(userId, companyId, workTypes).then(result=>{
			if(result.success){
				console.log('successfully updated worktypes');
				dispatch(getWorkTypes(userId, companyId));
			} else {
				console.log(result.error);
			}
		});
	};
};

export const deleteWorkType = (userId, companyId, workTypeId) => {
	return dispatch =>{
		deleteWorkTypeById(userId, companyId, workTypeId).then(result=>{
			if(result.success){
				console.log('successfully deleted worktype');
				dispatch(getWorkTypes(userId, companyId));
			} else {
				console.log(result.error);
			}
		});
	}
};

export const updateWorkDataObject = (property, value) => {
	return {
		type:'UPDATE_WORKDATA_OBJECT',
		payload: { property, value }
	};
};



export const removeLog = (contractorId, companyId, logId) => {
	return (dispatch)=> {
		console.log('ere');
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
					console.log(res);
					dispatch(getWorkLogs(contractorId, companyId));
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
				console.log(start, end);
				dispatch(updateEmployerDashboard('loggedWork', {workLogs: result, from:start, to: end}));
		});
	};
};

export const updateDashboardData = (dashboardItem, companyId, dates, range)=>{
	return async dispatch => {
		let newValue = {};
		if(dashboardItem === 'loggedWork'){
			newValue = {
				dates,
				range
			};
			await getWorkLogsRange(companyId, dates.from , dates.to).then(result=>{
				console.log(result);
				newValue.workLogs = result.logs;
				newValue.totalDuration = result.totalDuration;
			});
			await getAllWorkLogs(companyId).then(result=>{
				newValue.totalLogs = result.length;
			});
		}

		if(dashboardItem === 'contractors'){
			await getContractorDashboardData(companyId).then(res=>{
				newValue.newestContractor = res.lastCon.fullName;
				newValue.contractorCount = res.contractorCount;
				newValue.contractorList = res.contractorList;
				newValue.topPerformer = res.topPerformer[0].fullName;
			});
			await sixMonthsWorkLogs(companyId);

		}
		dispatch({
			type: 'UPDATE_DASHBOARD_DATA',
			payload: { dashboardItem, value: newValue }
		});
	}
}

const getContractorDashboardData = async (companyId) => {
	let time = 0;
	let lastCon = ''
	let contractorCount = 0;
	let contractorList = [];
	let topPerformer = '';
	await getAllContractors('', companyId).then(res=>{
		console.log('res - ', res);
		contractorCount = res.length;
		contractorList = _.orderBy(res, ['workData'], ['desc']);
		topPerformer = _.orderBy(res, ['dailySessions'], ['desc']);
		_.each(res, contractor=>{
			if(contractor.dateAdded > time){
				time = contractor.dateAdded;
				lastCon = contractor;
			}
		});
	});

	return { time, lastCon, contractorCount, contractorList, topPerformer };
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
				console.log('updated global work name');
			}
		});
	};
};

export const getGlobalWorkName = (companyId) => {
	return (dispatch) => {
		getEmployerGlobalWorkName(companyId).then(res=>{
			dispatch(updateWorkDataObject('globalWorkName', res.globalWorkName));
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
