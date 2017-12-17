const INITIAL_STATE = {
	formData:{
		email:null,
		name: null,
		phoneNumber: null
	},
	loading: false,
	error: null
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'CLEAR_ADD_CONTRACTOR_FORM':
			return {...INITIAL_STATE};
		case 'UPDATE_FORM_VALID':
			return {...state, formValid: action.payload};
		case 'UPDATE_VALIDATED':
			return {...state, validated: action.payload};
		case 'ADD_CONTRACTOR_ERROR':
			return {...state, error: action.payload};
		case 'BIND_ADD_CONTRACTOR_INPUT':
			let formData = {...state.formData};
			console.log('form data - ', formData);
			formData[action.payload.property] = action.payload.value;
			return {...state, formData: formData};
		default:
			return state;

	}
};