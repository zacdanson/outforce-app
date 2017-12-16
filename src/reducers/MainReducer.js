const INITIAL_STATE = {
	sidebar: 'max',
	loading:false,
	selectedTab: 'dashboard'
};


export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'SIDEBAR':
			return {...state, sidebar: action.payload};
		case 'SELECTED_TAB':
			return {...state, selectedTab: action.payload};
		case 'ERROR':
			return {...state, error: action.payload };
		case 'LOADING':
			return { ...state, loading: action.payload};
			break;
		default:
			return state;
	}

};