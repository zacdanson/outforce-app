const INITIAL_STATE = {
    userData: null,
    error: '',
    loading:false,
    email: '',
    password:'',
		profilePic: null,
		firstName:'',
		secondName:'',
		companyName: '',
		profilePicture: null,
		formValid: false,
		validated: 0
};

export default (state = INITIAL_STATE, action ) =>{
 		switch (action.type){
    	/// FUNCTION REDUCERS.
        case 'LOGIN_USER':
          return { ...state, result: action.payload};
				case 'SIGNUP_USER':
					return { ...state, result: action.payload};
				case 'SIGNUP_SUCCESS':
					return { ...state, user: action.payload, error:'', email:'', password: ''};
				case 'SIGNUP_FAILED':
					return { ...state, user: null , error: action.payload};
				case 'ERROR':
					return {...state, error: action.payload };

			/// UPDATE REDUCERS.
        case 'UPDATE_EMAIL':
          return { ...state, email:{ value: action.payload.email, valid: action.payload.valid } };
        case 'UPDATE_PASSWORD':
					return { ...state, password: { value: action.payload.password, valid: action.payload.valid }};
				case 'UPDATE_FIRST_NAME':
					return { ...state, firstName: { value: action.payload.name, valid: action.payload.valid } };
				case 'UPDATE_SECOND_NAME':
					return { ...state, secondName: { value: action.payload.name, valid: action.payload.valid } };
				case 'UPDATE_COMPANY_NAME':
					return { ...state, companyName: { value: action.payload.name, valid: action.payload.valid } };
				case 'UPDATE_USER':
					return { ...state, userData: action.payload, password:null};

				/// BINDING REDUCERS.
				case 'BIND_INPUT_VALUE':
						let property = action.payload.property;
						let value = action.payload.value;
						let user = { ...state.userData };
						user[property] = value;
						return { ...state, userData: user};
				case 'BIND_PROFILE_PICTURE':
					return { ...state, profilePicture: action.payload };


			default:
          return state;
    }
};
