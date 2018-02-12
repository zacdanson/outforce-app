const INITIAL_STATE = {
	contractorObject: {
		workLogs: [],
		details:{

		}
	}
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {

		case 'UPDATE_CONTRACTOR_OBJECT':
			let contractorObj = {...state.contractorObject};
			contractorObj[action.payload.property] = action.payload.value;
			console.log('OBJ - ', contractorObj);
			return { ...state, contractorObject: contractorObj };

		default:
			return state;

	}
};