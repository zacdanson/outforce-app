import {
	saveContractorObject,
	getContractorObject,
	addWorkData,
	getContractorJobRole,
	getInvoices
} from '../helpers/ContractorData';
import {
	updateLog,
	deleteLog,
	getContractorWorkData
} from '../helpers/EmployerData';
import {
	loading
} from './main_actions';

const updateContractorDetails = (contractor) => {
	return dispatch=>{
		saveContractorObject(contractor).then(res=>{
			if(!res.error){
				dispatch(getContractorData(contractor.uid));
			}
		});
	};
};

const updateContractorWorkLog = (logId, workTypeId, companyId, userId) => {
	return dispatch => {	
		updateLog(logId, workTypeId, companyId ).then(res=>{
			if(!res.error){
				dispatch(getContractorData(userId));
			}
		});
	};

};

const getAllContractorWorkLogs = (uid) => {
	return dispatch => {
		getContractorWorkData(uid).then(res=>{
			dispatch({
				type: 'UPDATE_CONTRACTOR_WORK_LOGS',
				payload: res
			});
		});
	};
};

const deleteContractorWorkLog = (userId, logId, companyId) => {
	return dispatch => {
		deleteLog(userId, logId, companyId ).then(res=>{
			if(!res.error){
				dispatch(getContractorData(userId));
				swal({
					title: 'Success',
					text: 'Deleted Work Log',
					icon: "success",
					buttons:false,
					timer:2000,
					className: 'swal-custom-padding'
				});
			}
		});
	};
};

const getContractorData = (userId) => {
	return dispatch=> {
		getContractorObject(userId).then(res=>{
			if(!res) {

				return;
			}
			dispatch({
				type:'UPDATE_CONTRACTOR_OBJECT',
				payload: res
			});
		});
	};
};



const addContractorWorkData = (workData, contractorData) => {
	return dispatch => {
		addWorkData(workData, contractorData).then(res=>{
			if(!res.error){
					swal({
						title: 'Success',
						text: 'Added Work Data',
						icon: "success",
						buttons:false,
						timer:2000,
						className: 'swal-custom-padding'
					});
					dispatch(getContractorData(contractorData.uid));
					dispatch({
						type: 'LOADING',
						payload: false
					});
			} else {
				swal({
					title: 'error',
					text: res.error,
					icon: "error",
					buttons:false,
					timer:2000,
					className: 'swal-custom-padding'
				});
			}
		});
	};
};


const getWorkLogsBetween = (uid, jobRoles, workLogs, start, end, callback) => {
			let logs = [];
			let numLogsToDate  = 0
			let nextJobRole = '';
			getJobRoleDetails(uid, (jobRole)=>{

				_.each(workLogs, log=>{
					if(log.start > start && log.start < end){
						logs.push(log);
					}
					if(log.start < end ){
						numLogsToDate+=1;
					}
				});

				_.each(jobRoles, role=>{

					if(role.id === jobRole.id){
						return;
					}
					nextJobRole = nextJobRole || role;
					if(role.amount < nextJobRole.amount && role.amount > jobRole.amount){
						nextJobRole = role;
					}
				});

				nextJobRole.leftToObtain = nextJobRole.amount - numLogsToDate;

				callback(logs, numLogsToDate, nextJobRole);
			});
};

const getJobRoleDetails = (uid, callback) =>{
	getContractorJobRole(uid).then(res=>{
		callback(res);
	});
};

const getPayPeriodStats = (contractorObject, jobRoles, start, end) => {
		return dispatch=>{
			let totalEarned = 0;
			if(!contractorObject.workLogs){

				return;
			}

			let hourlyRate = parseFloat(contractorObject.hourlyRate);
			if(!hourlyRate){
				return;
			}

			getWorkLogsBetween(contractorObject.uid, jobRoles, contractorObject.workLogs, start, end, (workLogs)=>{

				let earned = 0;
				_.each(workLogs, log=>{
					earned+=parseFloat(log.duration)/60*hourlyRate;
				});
				
				totalEarned = parseFloat(earned).toFixed(2);
				let stats = {
					start,
					end,
					workLogs,
					earned:totalEarned
				};
				dispatch({
					type:'UPDATE_CONTRACTOR_PAY_PERIOD_STATS',
					payload:stats
				});
			});
		}
};


const nextJobRole = (contractor, jobRoles) => {
	return dispatch => {
		let nextJobRole = '';
		getJobRoleDetails(contractor.uid, (jobRole)=>{
			_.each(jobRoles, role=>{
				if(role.id === jobRole.id){
					return;
				}
				nextJobRole = nextJobRole || role;
				if(role.amount < nextJobRole.amount && role.amount > jobRole.amount){
					nextJobRole = role;
				}
			});
			nextJobRole.leftToObtain = parseFloat(nextJobRole.amount) - contractor.workLogs.length;
			dispatch({
				type:'UPDATE_CONTRACTOR_NEXT_JOB_ROLE',
				payload: nextJobRole
			});
		});
	};
};

const getContractorInvoices = (uid) => {
	return dispatch => {
		getInvoices(uid).then(res=>{
			let invoices = [];

			_.each(res,(data)=>{
				let decodedStr = atob(data.invoice.base64).replace(/Â/g, '');
				invoices.push({
					base64: btoa(decodedStr),
					start:data.invoice.start,
					end: data.invoice.end,
					id: data.id
				});
			});

			dispatch({
				type: 'UPDATE_CONTRACTOR_INVOICES',
				payload: invoices
			});
		});
	};
};

const ContractorDataActions = {
	updateContractorDetails,
	updateContractorWorkLog,
	getContractorData,
	addContractorWorkData,
	deleteContractorWorkLog,
	getPayPeriodStats,
	getWorkLogsBetween,
	getJobRoleDetails,
	nextJobRole,
	getContractorInvoices
};

export default ContractorDataActions;