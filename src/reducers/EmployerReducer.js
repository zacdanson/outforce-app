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
		workLogs: [],
		workTypes: [],
		globalWorkName: ''
	},
	dashboardData:{
		ranges:[
			{label:'daily', value:0 }, {label:'weekly', value:1 }, { label:'monthly', value:2 }
		],
		loggedWork:{
			range:{ label:'daily', value:0 },
			dates: { from: moment().format('x'), to: moment().add(1, 'days').format('x') },
			workLogs:[],
			totalDuration:0
		},
		contractors:{
			contractorCount: 0,
			topContractor: '',
			newestContractor: '',
			contractorList: [],
			topPerformer:''
		},
		earned:''
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
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


		case 'UPDATE_DASHBOARD_DATA':
			let dashboard = { ...state.dashboardData };
			console.log('dash - ', dashboard);
			dashboard[action.payload.dashboardItem] = action.payload.value;
			return {...state, dashboardData: dashboard };

		case 'UPDATE_WORKDATA_FORM':
			let workDataForm = {...state.workDataForm };
			workDataForm[action.payload.property] = action.payload.value;
			return {...state, workDataForm: workDataForm };

		case 'UPDATE_WORKDATA_OBJECT':
			let workDataObject = {...state.workDataObject};
			workDataObject[action.payload.property] = action.payload.value;
		  return {...state, workDataObject: workDataObject };
		case 'BIND_ADD_CONTRACTOR_INPUT':
			let formData = {...state.formData};
			formData[action.payload.property] = action.payload.value;
			return {...state, formData: formData};

		case 'UPDATE_SELECTED_DURATION':
			let selectedDuration = {...state.selectedDuration};
			selectedDuration[action.payload.type] = action.payload.time;
			return {...state, selectedDuration: selectedDuration};

		default:
			return state;

	}
};