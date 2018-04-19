import axios from 'axios';
import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
import storage from 'redux-persist/es/storage';
import {
	handleError,
	updateUser,
	getUrlParameter
} from '../helper-actions/helper-actions';
import { loading } from '../main_actions';
import {
	getContractor
} from '../../helpers/ContractorData';
const vm = this;
const uuid = require('uuid4');

export const handleLogin = (email, password) => {
    return async (dispatch) => {
        if(!email || !password){
						console.log('must provide email and password.');
            dispatch(loginError('must provide email and password.'));
            return;
        }
        dispatch(loading(true));
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
							.then(data=>{
								console.log('logging in..', data);
							}).catch(error=>{
								dispatch(loginError(error));
								dispatch(loading(false));
								console.log('error logging in .', error);
            });
        } catch(err){
					console.log('here 2 ');
            console.log('error logging in - ', err);
						dispatch(loginError(err));
            dispatch(loading(false));
        }
    };
};


export const loginError = (error) => {
	return {
		type: 'LOGIN_ERROR',
		payload: error
	}
};


export const bindInputValue = (value, property, valid) => {
	return{
		type: 'BIND_AUTH_INPUT',
		payload: { value: value, property: property, valid: valid }
	};
};


export const logoutUser = (props) =>{
	firebase.auth().signOut().then(function() {
		console.log('logged user out');
		props.history.push({pathname: '/login'});
	}).catch(function(error) {
		// An error happened.
		props.history.push({pathname: '/index/employer-dashboard'});
		dispatch(loginError(error));
	});
};

const clearFormData = () => {
	return {
		type: 'CLEAR_FORM_DATA',
		payload: {}
	};
};



const signupEmployer = (uid, props, userData) =>{
	return (dispatch)=>{

		console.log(userData);
		console.log('user doesnt exist and is employer.');
		userData.userRole = 'employer';

		db.collection('users').doc(uid)
			.set(userData).then(()=>{
			db.collection('companies').add({
				name: props.formData.companyName.value,
			}).then(docRef=> {
				let uid = userData.uid;
				let apiKey = uuid();
				db.collection('companies').doc(docRef.id+'/users/'+uid).set({uid});
				db.collection('companies').doc(docRef.id+'/apiKeys/'+apiKey).set({uid, enabled: true});
				db.collection('users').doc(uid).update({companyId: docRef.id, apiKey});
				userData.companyId = docRef.id;
				userData.companyName = props.formData.companyName.value;
				dispatch({
					type:'UPDATE_USER_DATA',
					payload: userData
				});
				dispatch(loading(false));
				goToDashboard(dispatch, 'employer');
			});
	});

	};
};

export const signupContractor = (contractor, id, cid) =>{
	return (dispatch) =>{
		dispatch(loading(true));
		firebase.auth().createUserWithEmailAndPassword(contractor.email, contractor.password).then(user=>{
			let userData = firebase.auth().currentUser;
			console.log('userdataaaa-', userData);
			let uid = userData.uid;
			let usersRef = db.collection('users');
			let workData = [];

			//// get tempoorary data from old user id.
			usersRef.doc(id).get().then(docRef=>{
				if(docRef.exists){
					let tempData = docRef.data();
					let contractorData = {...contractor};
					contractorData.uid = uid;
					contractorData.userRole='contractor';
					contractorData.companyId= tempData.companyId;
					contractorData.registered = true;
					contractorData.linkActive= false;
					contractorData.dateAdded= tempData.dateAdded;
					contractorData.fullName = contractorData.firstName + ' ' + contractorData
					//// get all of the contractor work data if any has been added.
					db.collection('companies').doc(contractorData.companyId).collection('workData').where('uid', '==', id).get()
						.then(snapshot=>{
							//// loop through the workdata and change the old ID to the new user ID.
							snapshot.forEach(log=>{
								console.log('log-id ', log.id, 'uid -', uid, 'company id -', contractorData.companyId);
								db.collection('companies').doc(contractorData.companyId).collection('workData').doc(log.id).update({uid}).catch(error=>{ console.log(error)});
								workData.push(log.id);
							});
							//// create the new user and delete all of the temporary data.
							usersRef.doc(uid).set(contractorData).then(userRef=>{
								usersRef.doc(id).delete();
								db.collection('companies').doc(contractorData.companyId).collection('contractors').doc(id).delete();
								db.collection('companies').doc(contractorData.companyId).collection('contractors').doc(uid).set({uid: uid});
								console.log('wdata- ', workData);
								workData.forEach(logId=>{
									usersRef.doc(uid).collection('workData').doc(logId).set({logId});
								});
								console.log('created user & deleted temporary data.');
								//// log the user in and update the user prop.
								dispatch({
									type: 'UPDATE_USER_DATA',
									payload: contractorData
								});

								dispatch(loading(false));
								goToDashboard(dispatch, 'contractor');
							}).catch(error=>{
								console.log(error);
							})
						});
				} else {
					console.log('no invite registered for this user.');
					dispatch(loading(false));
				}
			})
		});
	};

};

export const getUserData = (uid, props) => {
	return (dispatch) => {
		console.log('get usa data ');
		dispatch(loading(true));
		db.collection('users').doc(uid).get().then(
			user => {
				if(user.exists){
					console.log('user exists.');
					let userData = user.data();
					/// user exists in DB so set user state.
					dispatch({
						type:'UPDATE_USER_DATA',
						payload: userData
					});

				goToDashboard(dispatch, userData.userRole);
				}
			});
	}
};

const goToDashboard = (dispatch, userRole) => {
	console.log('go to dash');
	if(!window.location.pathname.includes('index')){
		console.log('sending to homepage.');

		if(userRole === 'employer'){
			window.location.pathname = '/index/employer/employer-dashboard';
		} else {
			window.location.pathname = '/index/contractor/contractor-dashboard';
		}
		dispatch(clearFormData());
	}

};

const clearUserData = () => {
	return {
		type: 'CLEAR_USER_DATA',
		payload: {}
	};
};


export const checkAuth = (props) =>{
	return (dispatch)=>{
		try{
			let unsubscribe;
			if(unsubscribe){
				unsubscribe();
			}
			unsubscribe =	firebase.auth().onAuthStateChanged(data=>{
			console.log('auth status - ', data);
			if(data){
				console.log(data.uid);
				dispatch(getUserData(data.uid, props));
			} else {
				localStorage.clear();
				console.log('not signed in.');
				dispatch(clearUserData());
				dispatch(loading(false));
			if(window.location.pathname.includes('index')){
					window.location.pathname = '/login';
				}

			}
			});
		} catch(error) {
			dispatch(loginError(error));
			dispatch(loading(false));
		}
	};




};
