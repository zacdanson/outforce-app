const INITIAL_STATE = {
	payPeriodsToDate: [],
	companyDetails: {},
	financeOverview: [],
	payPeriodProfits: {
		profits: [],
		revenues: [],
		currentProfit: 0,
		currentRevenue: 0
	},
	invoiceTotals:''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'UPDATE_COMPANY_PAY_PERIODS_TO_DATE':
			return { ...state, payPeriodsToDate: action.payload };
		case 'UPDATE_COMPANY_DETAILS':
			return { ...state, companyDetails: action.payload };
		case 'UPDATE_TOTAL_INVOICES':
			return { ...state, invoiceTotals: action.payload };
		case 'UPDATE_FINANCE_OVERVIEW':
			return { ...state, financeOverview: action.payload };
		case 'UPDATE_PAY_PERIOD_PROFITS':
			return { ...state, payPeriodProfits: action.payload};
		default:
			return state;

	}
};