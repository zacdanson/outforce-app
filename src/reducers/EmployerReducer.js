const moment = require('moment');
const INITIAL_STATE = {
	formData:{
		email:'',
		name: '',
		phoneNumber: ''
	},
	workDataForm: {
		workType:'',
		dateWorked:''
	},
	loading: false,
	error: null,
	contractors: [],
	contractor: {},
	selectedUsers: [],
	selectedDate: '',
	selectedDuration: {
		start: '',
		end: ''
	},
	workDataObject: {
		dates: { from: moment().format('x'), to: moment().add(1, 'days').format('x') },
		workLogs: [],
		workTypes: [],
		globalWorkName: ''
	},
	dashboardData:{
		range:{ label:'daily', value:0 },
		ranges:[
			{label:'daily', value:0 }, {label:'weekly', value:1 }, { label:'monthly', value:2 }
		],
		workLogs:[]

	}

};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		//employer - contractors.
		case 'CLEAR_WORKDATA_FORM':
			return { ...state, selectedDuration: {start:'', end:''}, workDataForm: { workType: '', dateWorked: '' } };
		case 'SELECT_USER':
			return {...state, selectedUsers: action.payload };
		case 'CLEAR_SELECTED_USERS':
			return {...state, selectedUsers: [] };
		case 'CLEAR_ADD_CONTRACTOR_FORM':
			return {...INITIAL_STATE};
		case 'UPDATE_FORM_VALID':
			return {...state, formValid: action.payload};
		case 'UPDATE_VALIDATED':
			return {...state, validated: action.payload};
		case 'ADD_CONTRACTOR_ERROR':
			return {...state, error: action.payload};
		case 'UPDATE_CONTRACTORS_LIST':
			return { ...state, contractors: action.payload };
		case 'UPDATE_WORKDATA_FORM':
			let workDataForm = {...state.workDataForm };
			workDataForm[action.payload.property] = action.payload.value;
			return {...state, workDataForm: workDataForm };
		case 'UPDATE_WORKDATA_OBJECT':
			return {...state, workDataObject: action.payload};
		case 'BIND_ADD_CONTRACTOR_INPUT':
			let formData = {...state.formData};
			formData[action.payload.property] = action.payload.value;
			return {...state, formData: formData};
		case 'UPDATE_SELECTED_DURATION':
			let selectedDuration = {...state.selectedDuration};
			selectedDuration[action.payload.type] = action.payload.time;
			return {...state, selectedDuration: selectedDuration};

		// employer dashboard
		case 'UPDATE_DASHBOARD_DATA':
			return {...state, dashboardData: action.payload};
		case 'UPDATE_DASHBOARRD_DATA_PROPERTY':
			let newDashState = {...state.dashboardData};
			newDashState[action.property] = action.payload;
			return {...state, acti};

		default:
			return state;

	}
};