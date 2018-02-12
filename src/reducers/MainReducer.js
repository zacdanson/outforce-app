const INITIAL_STATE = {
	sidebar: 'max',
	loading:false,
	loadingAnimation:false,
	selectedTab: {
		name: '',
		location: ''
	}

};


export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'SIDEBAR':
			return {...state, sidebar: action.payload};
		case 'SELECTED_TAB':
			return {...state, selectedTab: action.payload};
		case 'ERROR':
			return {...state, error: action.payload };
		case 'IS_LOADING':
			return { ...state, loading: action.payload};
			break;
		case 'LOADING':
			return { ...state, loadingAnimation: action.payload };
		default:
			return state;
	}

};