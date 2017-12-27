const INITIAL_STATE = {
	formData:{
		email:'',
		name: '',
		phoneNumber: ''
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
	workType: '',
	workLogs:''
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CLEAR_WORK_DATA':
			return { ...state, selectedDuration: {start:'', end:''}, selectedDate: '', workType: '' };
		case 'UPDATE_WORK_TYPE':
			return { ...state, workType: action.payload  };
		case 'SELECT_USER':
			return {...state, selectedUsers: action.payload };
		case 'CLEAR_SELECTED_USERS':
			return {...state, selectedUsers: [] };
		case 'CLEAR_ADD_CONTRACTOR_FORM':
			console.log('CLEAR_ADD_CONTRACTOR_FORM');
			return {...INITIAL_STATE};
		case 'UPDATE_FORM_VALID':
			return {...state, formValid: action.payload};
		case 'UPDATE_VALIDATED':
			return {...state, validated: action.payload};
		case 'ADD_CONTRACTOR_ERROR':
			return {...state, error: action.payload};
		case 'UPDATE_CONTRACTORS_LIST':
			return { ...state, contractors: action.payload };
		case 'SET_CONTRACTOR':
			return { ...state, contractor: action.payload };
		case 'UPDATE_SELECTED_DATE':
			return { ...state, selectedDate: action.payload };
		case 'UPDATE_WORK_LOGS':
		  return {...state, workLogs: action.payload };
		case 'BIND_ADD_CONTRACTOR_INPUT':
			let formData = {...state.formData};
			console.log('form data - ', formData);
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