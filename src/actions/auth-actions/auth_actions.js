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

export const handleLogin = (email, password) => {
    return async (dispatch) => {
        if(!email || !password){
            dispatch(loginError('must provide email and password.'));
            return;
        }
        dispatch(loading(true));
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
							.then(data=>{
								console.log('logging in..');
							}).catch(error=>{
								dispatch(loginError(error));
								dispatch(loading(false));
            });
        } catch(err){
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


const exportWorkData = (id, newId) => {
	return (dispatch)=>{
		let batchRef = db.collection("workData");
		db.collection("pendingInvites").doc(id).collection('workData').get()
			.then(snapshot=>{
				snapshot.forEach(log=>{
					console.log(log);
					batchRef.doc(log.id).update({"uid":newId});
					db.collection('users').doc(newId).collection('workData').doc(log.id).set({logId:log.id});
				});
				db.collection('pendingInvites').doc(id).delete();
			}).catch(error=>{
			console.log(error);
		});
	};
}

const getUserData = (uid, props) => {
	return (dispatch) => {
		console.log('get usa data ');
		dispatch(loading(true));
		db.collection('users').doc(uid).get().then(
			user => {

				if(user.exists){
					console.log('user exists.');
					vm.userData = user.data();
					/// user exists in DB so set user state.
					dispatch(updateUser(user.data()));
					goToDashboard(dispatch);
				} else {

					vm.userData =
						{
							uid: uid,
							email: props.formData.email.value,
							firstName: props.formData.firstName.value,
							secondName: props.formData.secondName.value,
							companyName: props.formData.companyName.value,
							fullName: props.formData.firstName.value + ' ' + props.formData.secondName.value,
						};

					console.log(vm.userData);

					let id = getUrlParameter('id');

					if(id){

						let pendingRef = db.collection('pendingInvites').doc(id);
						pendingRef.get().then(
							(docRef)=>{
								if(docRef.exists) {

									let docData = docRef.data();

									console.log('user doesnt exist and is contractor.');

									vm.userData.phoneNumber = props.formData.phoneNumber.value;
									vm.userData.companyId = props.formData.companyId.value;
									vm.userData.companyName = props.formData.companyName.value;
									vm.userData.userRole = 'contractor';


									db.collection('users').doc(uid).set(vm.userData)
										.then(() => {
											dispatch(exportWorkData(id, uid));
											db.collection('companies').doc(vm.userData.companyId +'/contractors/'+id).delete();
											dispatch(updateUser(vm.userData));
											db.collection('companies').doc(vm.userData.companyId).collection('contractors').doc(uid).set({
												uid
											}).catch(error => {
												console.log('error adding userdata to company. - ', error);
											});
											goToDashboard(dispatch);
										}).catch(error => {
										console.log('error adding user to users table. - ', error);
									});
								}

						});
					} else {

						vm.userData.userRole = 'employer';

						console.log('user doesnt exist and is employer.');
						db.collection('users').doc(uid)
							.set(vm.userData).then(()=>{
							db.collection('companies').add({
								name: props.formData.companyName.value,
							}).then(docRef=> {
								let uid = vm.userData.uid;
								db.collection('companies').doc(docRef.id+'/users/'+uid).set({uid});
								db.collection('users').doc(uid).update({companyId: docRef.id});
								vm.userData.companyId = docRef.id;
								vm.userData.companyName = props.formData.companyName.value;
								dispatch(updateUser(vm.userData));
								goToDashboard(dispatch);
							});
						});

					}

				}

			});
	}
};

const goToDashboard = (dispatch) => {
	console.log('go to dash');
	if(!window.location.pathname.includes('index')){
		console.log('sending to homepage.');
		if(vm.userData.userRole === 'employer'){
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
				console.log(props);
				dispatch(getUserData(data.uid, props));

			} else {
				localStorage.clear();
				console.log('not signed in.');
				dispatch(clearUserData());

				if(window.location.pathname.includes('index')){
					window.location.pathname = '/login';
				}
				dispatch(loading(false));
			}
		 });

		} catch(error) {
			dispatch(loginError(error));
		}
	};




};
