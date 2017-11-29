const INITIAL_STATE = {
    user: null,
    error: {
        code:'',
        message:''
    },
    loading:false,
    email: '',
    password:''
};

export default (state = INITIAL_STATE, action ) =>{

    switch (action.type){
        case 'LOGIN_USER':
            return { ...state, result: action.payload};
        case 'LOGIN_SUCCESS':
            return { ...state, user: action.payload, error:'', loading:false, email:'', password: ''};
        case 'LOGIN_FAILED':
            return { ...state, user: null , error: action.payload, loading:false, password: ''};
				case 'SIGNUP_USER':
					return { ...state, result: action.payload};
				case 'SIGNUP_SUCCESS':
					return { ...state, user: action.payload, error:'', email:'', password: ''};
				case 'SIGNUP_FAILED':
					return { ...state, user: null , error: action.payload, password: ''};
        case 'UPDATE_EMAIL':
            return { ...state, email: action.payload };
        case 'UPDATE_PASSWORD':
            return { ...state, password: action.payload };
        case 'LOADING':
            return { ...state, loading: action.payload };
        default:
            return state;
    }
};
