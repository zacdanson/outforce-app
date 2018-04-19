const INITIAL_STATE = {
	payPeriodsToDate: [],
	companyDetails: {}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'UPDATE_COMPANY_PAY_PERIODS_TO_DATE':
			return { ...state, payPeriodsToDate: action.payload };
		case 'UPDATE_COMPANY_DETAILS':
			return { ...state, companyDetails: action.payload };
		default:
			return state;

	}
};