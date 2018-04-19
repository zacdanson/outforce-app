import {
	getEmployerWorkTypes,
	updateEmployerWorkTypes,
	updateEmployerWorkType,
	deleteWorkTypeById,
	getAllWorkLogs,
	getAllContractors,
	deleteLog,
	updateLog,
	addWorkType,
	getWorkLogsRange,
	getEmployerGlobalWorkName,
	updateEmployerGlobalWorkName,
	sixMonthsWorkLogs
} from '../helpers/EmployerData';



const getWorkLogs = (companyId) => {
	return dispatch=> {
		getAllWorkLogs(companyId).then(result => {
			dispatch({
				type: 'UPDATE_WORK_LOGS',
				payload: result
			});
		});
	}
};

const getWorkTypes = (userId, companyId) => {
	return dispatch =>{
		getEmployerWorkTypes(userId, companyId).then(result=>{
			dispatch({
				type: 'UPDATE_WORK_TYPES',
				payload: result
			});
		});
	};
};

const getWorkName = (companyId) => {
	return dispatch=> {
		getEmployerGlobalWorkName(companyId).then(result=>{
			dispatch({
				type:'UPDATE_GLOBAL_WORK_NAME',
				payload: result
			});
		});
	};
};

const updateWorkType = (companyId, workTypeId, workType) => {
	return dispatch => {
		updateEmployerWorkType(companyId, workTypeId, workType).then(result=>{
			if(result.success){
				dispatch(getWorkTypes('', companyId));
				return;
			}
			console.log('error');
		})
	};

};

const deleteWorkType = (companyId, workTypeId) => {
	return dispatch => {
		deleteWorkTypeById('',companyId, workTypeId).then(result=>{
			if(result.success){
				dispatch(getWorkTypes('', companyId));
				return;
			}
			console.log('error');
		})
	};
};

const deleteWorkLog = (contractorId, logId, companyId ) => {
	return dispatch => {
		deleteLog(contractorId, logId, companyId).then(result=>{
			if(!result.error){
				dispatch(getWorkLogs(companyId));
			}
		})
	};
};

const updateWorkLog = (logId, workTypeId, companyId) => {
	console.log(logId, workTypeId, companyId);
	return dispatch => {
		updateLog(logId, workTypeId, companyId).then(result=>{
			if(!result.error){
				dispatch(getWorkLogs(companyId));
			}
		})
	};
};

const updateGlobalWorkName = (companyId, workName) => {
	return dispatch => {
		updateEmployerGlobalWorkName(companyId, workName).then(res=>{
			if(!res.error){
				dispatch(getWorkName(companyId));
			}
		});
	};
};

const createWorkType = (companyId, workTypeId, workType) => {
	return dispatch => {
		addWorkType(companyId, workTypeId, workType).then(res=>{
			if(!res.error){
				dispatch(getWorkTypes('', companyId));
			}
		});
	};
};



const WorkDataActions = {
	getWorkLogs,
	getWorkTypes,
	getWorkName,
	updateWorkType,
	deleteWorkType,
	deleteWorkLog,
	updateWorkLog,
	updateGlobalWorkName,
	createWorkType
};

export default WorkDataActions;