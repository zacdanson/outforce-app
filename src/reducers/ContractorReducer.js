const INITIAL_STATE = {
	contractor:{},
	nextJobRole:{},
	payPeriodStats:{},
	invoices: []

};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'UPDATE_CONTRACTOR_NEXT_JOB_ROLE':
			return { ...state, nextJobRole: action.payload };
		case 'UPDATE_CONTRACTOR_PAY_PERIOD_STATS':
			return { ...state, payPeriodStats: action.payload };
		case 'UPDATE_CONTRACTOR_OBJECT':
			return { ...state, contractor: action.payload };
		case 'UPDATE_CONTRACTOR_INVOICES':
			return { ...state, invoices: action.payload };
		default:
			return state;

	}
};