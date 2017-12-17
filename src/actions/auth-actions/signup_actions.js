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

export const setUserRole = () => {
	let role;
	if(window.location.pathname === 'employer-signup'){
		role = 'employer';
	} else {
		role = 'contractor';
	}
	return{
		type: 'SET_USER_ROLE',
		payload: role
	};
};


export const handleSignup = ( email, password ) => {
	return async (dispatch) =>{
		try {
			dispatch(setUserRole());
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

export const checkInviteLink = () => {
	return (dispatch) => {
		dispatch(loading(true));
		let queryStr = window.location.search;
		let idPos = queryStr.indexOf('id=')+3;
		let id = queryStr.slice(idPos, queryStr.length);
		console.log(id);
		if(!id){
			window.location.pathname= '/login';
			dispatch(loading(false));
		}
		db.collection('pendingInvites').doc(id).get()
			.then(docRef=>{
				/// if there isn't an active link or the link is === false.
				if(docRef.exists){
					let data  = docRef.data();
					if(data.linkActive){
						console.log('link active so contiue');
						return;
					}
				}
				console.log('link not active.');
				window.location.pathname= '/disabled-invite';
				dispatch(loading(false));
		});
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
