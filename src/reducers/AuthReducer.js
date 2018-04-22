const INITIAL_STATE = {
	formValid: false,
	error: null,
	formData: {
		email: {value: '', valid: null },
		password: {value: '', valid: null },
		secondName: {value: '', valid: null },
		firstName: {value: '', valid: null },
		companyName: {value: '', valid: null },
		phoneNumber: {value: '', valid: null },
		companyId: { value: '', valid: null},
		userId: { value: '', valid: null},
		userRole: null
	}
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'SET_USER_ROLE':

			let form = {...state.formData};
			form.userRole = action.payload;
			return { ...state, formData: form };
		case 'SIGNUP_ERROR':
			return { ...state, error: action.payload };
		case 'CLEAR_FORM_DATA':
			return { ...INITIAL_STATE };
		case 'UPDATE_FORM_VALID':
			return {...state, formValid: action.payload};
		case 'UPDATE_VALIDATED':
			return { ...state, validated: action.payload };
		case 'LOGIN_ERROR':
			return {...state, error: action.payload };
		case 'BIND_AUTH_INPUT':
			let formData = { ...state.formData };

			formData[action.payload.property].value = action.payload.value;
			formData[action.payload.property].valid = action.payload.valid;
			return {...state, formData:formData };
		default:
			return state;
	}

};