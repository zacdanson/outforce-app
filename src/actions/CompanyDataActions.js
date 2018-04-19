import {
	updateEmployerAutoSendInvoices,
	getCompanyDataObject,
	updateCompanyPayPeriod,
	getCompanyPayPeriod,
	getCompanyJobRoles,
	saveCompanyDetails,
	saveCompanyLogo
} from '../helpers/CompanyData.js'


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

const payPeriodsToDate = (companyId) => {
	return dispatch=> {
		getCompanyPayPeriod(companyId).then(res=>{
			let currentPeriod = res;
			let firstPayPeriodStart = currentPeriod.start;
			console.log(' current period = ', res);
			let payPeriods = [];
			for(let i = currentPeriod.numPayPeriod; i>0; i--){
				payPeriods.push({
					start: firstPayPeriodStart,
					end: moment(firstPayPeriodStart, 'x').add(2, 'weeks').subtract(1, 'days').format('x'),
					numPayPeriod: i
				});
				firstPayPeriodStart = moment(firstPayPeriodStart, 'x').subtract(2, 'weeks').format('x')
			}

			dispatch({
				type:'UPDATE_COMPANY_PAY_PERIODS_TO_DATE',
				payload: payPeriods
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
				console.log('error getting job roles -  ', res.error);
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