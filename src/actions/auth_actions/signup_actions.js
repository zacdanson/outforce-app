import axios from 'axios';


export const updateEmail = (email) => {
	console.log('email ', email);
	return{
		type: 'UPDATE_EMAIL',
		payload: email
	};

};

export const updatePass = (password) => {
	return{
		type: 'UPDATE_PASSWORD',
		payload: password
	};
};


const signupFailed = (error) => {
	return {
		type: 'SIGNUP_FAILED',
		payload: error
	};
};


const loginSuccess = (user) => {
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
