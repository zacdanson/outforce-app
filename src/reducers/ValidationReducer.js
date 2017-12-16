const INITIAL_STATE = {
	formValid: false
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'UPDATE_FORM_VALID':
			return {
				...state,
				formValid: action.payload
			};
			break;
		default:
			return state;
	}

};