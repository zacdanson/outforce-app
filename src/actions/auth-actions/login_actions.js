import axios from 'axios';
import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
import storage from 'redux-persist/es/storage';
import {
	loading,
	handleError,
	updateUser
} from '../helper-actions/helper-actions';

export const handleLogin = (email, password) => {
    return async (dispatch) => {
    	console.log(email, password);
        if(!email || !password){
            dispatch(loginError('must provide email and password.'));
            return;
        }
        dispatch(loading(true));
        try {
            firebase.auth().signInWithEmailAndPassword(email, password)
							.then(response=>{
								getUserData(response.uid);
								return response;
							}).catch(error=>{
								dispatch(loginError(error));
								dispatch(loading(false));
            });
        } catch(err){
            console.log('error2 - ', err);
						dispatch(loginError(err));
            dispatch(loading(false));
        }
    };
};

export const getUserData = (uid) => {
	return (dispatch)=>{
		db.collection("users").doc(uid).get()
			.then(doc=>{
				if (doc.exists) {
					console.log("Document data:", doc.data());
					dispatch(loading(false));
					dispatch(updateUser(doc.data()));
				} else {
					console.log("No such document!");
					dispatch(loading(false));

				}
			}).catch(error=>{
			console.log("Error getting document:", error);
			dispatch(loginError(error));
			dispatch(loading(false));
		});
		dispatch(loading(false));
	};
} ;

export const loginError = (error) => {
	return {
		type: 'LOGIN_ERROR',
		payload: error
	}
};


export const bindInputValue = (value, property, valid) => {
	console.log(property);
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
		props.history.push({pathname: '/index/user-dashboard'});
		dispatch(loginError(error));
	});
};

export const checkAuth = (props) =>{
	return (dispatch)=>{
		firebase.auth().onAuthStateChanged(data=>{
			console.log('auth status - ', data);
			if(data){
				db.collection('users').doc(data.uid).get().then(userData=>{
					dispatch(updateUser(userData.data()));
					dispatch(loading(false));
					if(props.history.location.pathname.includes('index')){
						return;
					}
					props.history.push({pathname: '/index/user-dashboard'});
				});
			} else {
				console.log('not signed in.');
				if(props.history.location.pathname !== '/login' && props.history.location.pathname !== '/employer-signup'  ){
					props.history.push({pathname: '/login'});
				}
				dispatch(loading(false));
				localStorage.clear();

			}
		});
	};




};
