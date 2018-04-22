import {
	updateEmployerAutoSendInvoices,
	getCompanyDataObject,
	updateCompanyPayPeriod,
	getCompanyPayPeriod,
	getCompanyJobRoles,
	saveCompanyDetails,
	saveCompanyLogo
} from '../helpers/CompanyData.js'
import {
	getProfits
} from '../helpers/EmployerData.js';

const updateAutoSendInvoices = (companyId, status) => {
	return dispatch => {
		updateEmployerAutoSendInvoices(companyId, status).then(res=>{
			if(!res.error){
				dispatch(getCompanyData(companyId));
			}
		});
	};
};

const getCompanyData = (companyId) =>{
	return (dispatch)=>{
		getCompanyDataObject(companyId).then(res=>{
			if(!res.error){
				dispatch(updateCompanyData(res));
				dispatch({
					type:'IS_LOADING',
					payload: false
				});
			}
		});
	};
};

const updateCompanyData = (companyData) => {
	return {
		type: 'UPDATE_COMPANY_DATA',
		payload: companyData
	};
};

const updatePayPeriodDetails = (selectedPayFrequency, companyId) =>{
	return dispatch =>{
		updateCompanyPayPeriod(selectedPayFrequency, companyId).then(res=>{
			dispatch(getCurrentPayPeriod(companyId));
				swal({
					icon:'success',
					text:'Updated Pay Periods',
					timer:2000,
					buttons:false
				});
			});
	};
};

const getCurrentPayPeriod = (companyId) => {
	return dispatch=>{
		getCompanyPayPeriod(companyId).then(res=>{
			dispatch({
				type: 'UPDATE_CURRENT_PAY_PERIOD',
				payload: res
			});
		});
	};
};

const getPayPeriodProfits = (companyId, payPeriods) => {
	return new Promise((resolve, reject)=>{
		let promises = [];
		_.each(payPeriods, period=>{
			promises.push(getProfits(companyId, period.start, period.end));
		});
		Promise.all(promises).then(results=>{
			_.each(results, (result, index)=>{
				payPeriods[index].profit = parseInt(result.grossProfit);
				payPeriods[index].revenue = parseInt(result.profit);
			});
			resolve(payPeriods);
		});
	});
};

const payPeriodsToDate = (companyId) => {
	return dispatch=> {
		getCompanyPayPeriod(companyId).then(res=>{
			let currentPeriod = res;
			let firstPayPeriodStart = currentPeriod.start;

			let payPeriods = [];
			for(let i = currentPeriod.numPayPeriod; i>0; i--){
				payPeriods.unshift({
					start: firstPayPeriodStart,
					end: moment(firstPayPeriodStart, 'x').add(2, 'weeks').subtract(1, 'days').format('x'),
					numPayPeriod: i
				});
				firstPayPeriodStart = moment(firstPayPeriodStart, 'x').subtract(2, 'weeks').format('x')
			}

			getPayPeriodProfits(companyId, payPeriods).then(result=>{
				dispatch({
					type:'UPDATE_COMPANY_PAY_PERIODS_TO_DATE',
					payload: payPeriods
				});
			});


		});
	};
};


const getJobRoles = (companyId) => {
	return dispatch => {
		getCompanyJobRoles(companyId).then(res=>{
			if(!res.error){
				dispatch({
					type: 'UPDATE_JOB_ROLES',
					payload: res
				});
			} else {

			}
		});
	};
};

const updateCompanyDetails = (companyDetails) => {
	return dispatch=>{
		saveCompanyDetails(companyDetails).then(res=>{
			swal({
				icon:'success',
				text: 'Successfully Updated Company Details!',
				timer: 2000,
				buttons: false
			});
			dispatch({
				type:'UPDATE_COMPANY_DATA',
				payload: companyDetails
			});
		});
	};
};

const uploadCompanyLogo = (companyId, file, filename) =>{
	return dispatch => {
		dispatch({
			type:'IS_LOADING',
			payload: true
		});
		saveCompanyLogo(companyId, file, filename).then(res=>{
			dispatch(getCompanyData(companyId));
		});
	};
};

const CompanyDataActions = {
	updateAutoSendInvoices,
	getCompanyData,
	updatePayPeriodDetails,
	getCurrentPayPeriod,
	getJobRoles,
	updateCompanyDetails,
	uploadCompanyLogo,
	payPeriodsToDate
};

export default CompanyDataActions;