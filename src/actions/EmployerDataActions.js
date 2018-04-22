import {
	getAllContractors,
	saveEmployerJobRole,
	addEmployerJobRole,
	deleteEmployerJobRole,
	getEmployerAssignCondition,
	updateEmployerAssignCondition,
	updateEmployerAutoSendInvoices,
	getAllContractorsInvoiceTotal,
	getJobRoles,
	getEmployerFinanceTotals,
	getProfits
} from  '../helpers/EmployerData';

import {
	addContractor,
	deleteContractors,
	getUserWorkData
} from '../helpers/ContractorData';

const getContractors = (userId, companyId) => {
	return dispatch => {

		getAllContractors(userId, companyId).then(result=>{
			dispatch({
				type:'UPDATE_CONTRACTORS_LIST',
				payload: result
			});
		});
	}
};
const addEmployerContractor = (user, employerName, companyId, companyName) => {
	return dispatch => {
		addContractor(user, employerName, companyId, companyName).then(res=>{
			if(!res.error){
				dispatch(getContractors('', companyId));
				swal({
					title: 'Success',
					text: 'Added Contractor',
					icon: "success",
					buttons:false,
					timer:2000,
					className: 'swal-custom-padding'
				});
				return;
			}

			swal({
				title: 'error',
				text: res.error.message,
				icon: "error",
				buttons:false,
				timer:2000,
				className: 'swal-custom-padding'
			});
		});
	}
};

const deleteEmployerContractors = (users, companyId) => {
	return dispatch => {
		deleteContractors(users, companyId).then(res=>{
			if(!res.error){
				swal({
					title: 'Success',
					text: 'Removed Contractor',
					icon: "success",
					buttons:false,
					timer:2000,
					className: 'swal-custom-padding'
				});
				dispatch(getContractors('', companyId));
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


const saveJobRole = (id, name, hourlyRate, assign, roleRequirements, companyId) => {
	return dispatch => {

		saveEmployerJobRole(id, name, hourlyRate, assign, roleRequirements, companyId).then(res=>{
			if(!res.error){
				dispatch(getJobRoles(companyId));
			} else {
				console.log('error updating job role -', res.error);
			}
		});
	};
};
const addJobRole = (name, hourlyRate, companyId, assign ='manual' ) => {
	return dispatch => {
		addEmployerJobRole(name, hourlyRate, companyId, assign).then(res=>{
			if(!res.error){
				dispatch(getJobRoles(companyId));
			} else {
				console.log('error adding job role - ', res.error);
			}
		});
	};
};

const deleteJobRole = (jobRoleId, companyId) => {
	return dispatch=>{
		deleteEmployerJobRole(jobRoleId, companyId).then(res=>{
			if(!res.error){
				dispatch(getJobRoles(companyId));
			} else {
				console.log('error removing job role - ', res.error);
			}
		});
	};
};

const getAssignCondition = (companyId) => {
	return dispatch=> {
		getEmployerAssignCondition(companyId).then(res=>{
			if(!res.error){
				dispatch({
					type:'UPDATE_ASSIGN_CONDITION',
					payload: res.assignCondition
				});
			}
		});
	};
};

const updateAssignCondition = (companyId, assignCondition) => {
	return dispatch=> {
		updateEmployerAssignCondition(companyId, assignCondition).then(res=>{
			if(!res.error){
				dispatch(getAssignCondition(companyId));
			}
		});
	};
};

const calculateTotalInvoices = (companyId, start, end) => {
	return dispatch => {
		getAllContractorsInvoiceTotal(companyId, start, end).then((res)=>{

			dispatch({
				type:'UPDATE_TOTAL_INVOICES',
				payload: res
			});

		});
	};
};

export const calculateProfit = (companyId, start, end) => {
	return dispatch => {
		getProfits(companyId, start, end).then((res)=>{


		});
	};
};

const getFinanceTotals = (companyId, range) => {

	return dispatch => {
		getEmployerFinanceTotals(companyId, range).then(res=>{
			dispatch({
				type:'UPDATE_FINANCE_OVERVIEW',
				payload:res
			});
		});
	}

};





const EmployerDataActions = {
	deleteEmployerContractors,
	addEmployerContractor,
	getContractors,
	saveJobRole,
	addJobRole,
	deleteJobRole,
	getAssignCondition,
	updateAssignCondition,
	calculateTotalInvoices,
	calculateProfit,
	getFinanceTotals
};

export default EmployerDataActions;