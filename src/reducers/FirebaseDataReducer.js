const INITIAL_STATE = {
	contractors: [],
	userData: {},
	workTypes: [],
	workLogs: [],
	globalWorkName:'Work',
	jobRoles:[],
	assignCondition: '',
	companyData:{},
	currentPayPeriod: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'UPDATE_CONTRACTORS_LIST':
			return {...state, contractors: action.payload };
		case 'UPDATE_WORK_LOGS':
			return {...state, workLogs: action.payload };
		case 'UPDATE_USER_DATA':
			return {...state, userData: action.payload };
		case 'UPDATE_WORK_TYPES':
			return {...state, workTypes: action.payload };
		case 'UPDATE_GLOBAL_WORK_NAME':
			return {...state, globalWorkName: action.payload };
		case 'UPDATE_JOB_ROLES':
			return {...state, jobRoles: action.payload };
		case 'UPDATE_ASSIGN_CONDITION':
			return {...state, assignCondition: action.payload };
		case 'UPDATE_COMPANY_DATA':
			return { ...state, companyData: action.payload};
		case 'UPDATE_CURRENT_PAY_PERIOD':
			return { ...state, currentPayPeriod: action.payload};
		default:
			return state;
	}
};

