import axios from 'axios';
import { handleLogin } from './login_actions';


export const bindInputValue = (value, property, valid) => {
	console.log(property);
	return{
		type: 'BIND_AUTH_INPUT',
		payload: { value: value, property: property, valid: valid }
	};
};


export const handleSignup = ( email, password, firstName, secondName, companyName ) => {
	return async (dispatch) =>{
		const userData = {
			email: email,
			password:password,
			firstName: firstName,
			secondName: secondName,
			companyName: companyName
		};
		dispatch(loading(true));
		try {
			await axios.post('https://us-central1-outforce-app.cloudfunctions.net/app/users/signupWithCredentials/', {
				userData
			})
				.then(data=>{
					console.log(data);
					const user = {
						email: userData.email,
						firstName: userData.firstName,
						secondName: userData.secondName,
						companyName: userData.companyName
					};
					dispatch(signupSuccess(user));
					dispatch(handleLogin(email, password));
			})
				.catch(response=>{
					console.log('error - ', response.response.data.error);
					dispatch(loading(false));
					dispatch(signupFailed(response.response.data.error));
				});

		} catch (response){
			console.log('error - ', response.response.data.error);
			dispatch(loading(false));
			dispatch(signupFailed(response.response.data.error));
		}
	};
};

export const uploadImg = (blob) => {
	return {
		type: 'UPLOAD_IMAGE',
		payload: blob
	}
};

const signupFailed = (error) => {
	return {
		type: 'SIGNUP_FAILED',
		payload: error
	};
};

const signupSuccess = (user) => {
	return {
		type: 'SIGNUP_SUCCESS',
		payload: user
	};
};

const loading = (status) => {
	return {
		type: 'LOADING',
		payload: status
	};
};
