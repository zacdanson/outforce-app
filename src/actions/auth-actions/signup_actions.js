import axios from 'axios';
import { handleLogin } from './login_actions';
import firebase from 'firebase';
import { db } from '../../../firebase-config.js'


export const bindInputValue = (value, property, valid) => {
	console.log(property);
	return{
		type: 'BIND_AUTH_INPUT',
		payload: { value: value, property: property, valid: valid }
	};
};


export const signupError = (error) => {
	return {
		type: 'SIGNUP_ERROR',
		payload: error
	}
};


export const handleSignup = ( email, password, firstName, secondName, companyName ) => {
	return async (dispatch) =>{
		try {
			dispatch(loading(true));
			firebase.auth().createUserWithEmailAndPassword(email, password).catch(error=>{
				if(error){
					dispatch(signupError(error.code));
				}
			});
		} catch (error){
			dispatch(loading(false));
			dispatch(signupFailed(error));
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
