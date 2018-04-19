import axios from 'axios';
import { handleLogin } from './auth_actions';
import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
import {
	getUrlParameter
} from '../helper-actions/helper-actions';

export const bindInputValue = (value, property, valid) => {
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
	if(window.location.pathname === '/employer/employer-signup'){
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
	return (dispatch) =>{
		try {
			console.log('here');
		firebase.auth().createUserWithEmailAndPassword(email, password).catch(error=>{
				if(error){
					console.log(error);
					dispatch(signupError(error));
				}
			});
		} catch (error){
			console.log(error);
			dispatch(loading(false));
			dispatch(signupError(error));
		}
	};
};


export const checkInviteLink = (id, cid, type) => {
	return (dispatch) => {
		dispatch(loading(true));

		console.log(id);
		if(!id || !cid  ||!type){
			window.location.pathname= '/login';
			dispatch(loading(false));
		}

		db.collection('users').doc(id).get()
			.then(docRef=>{
				/// if there isn't an active link or the link is === false.
				if(docRef.exists){
					let data  = docRef.data();
					console.log(data);
					if(data.linkActive){
						console.log('link active so continue');
						dispatch(loading(false));
						return;
					}
				}
				console.log('link not active.');
				window.location.pathname= '/disabled-invite';
				dispatch(loading(false));
		});
	};
};


export const handleContractorSignup = (contractor) => {
	return (dispatch) => {
	console.log('contractor signup! ');
	dispatch(loading(true));
	firebase.auth().createUserWithEmailAndPassword(contractor.email, contractor.password).catch(error=>{
		if(error){
			console.log('error with contractor signup - ', error );
			dispatch(signupError(error.code));
		}
	});

	};
};


const loading = (status) => {
	return {
		type: 'LOADING',
		payload: status
	};
};
