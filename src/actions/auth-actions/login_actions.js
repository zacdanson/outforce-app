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
							.then(data=>{
								getUserData(data.uid);
								return data;
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

const clearFormData = () => {
	return {
		type: 'CLEAR_FORM_DATA',
		payload: {}
	};
};

export const checkAuth = (props) =>{
	return (dispatch)=>{
		let unsubscribe;
		if(unsubscribe){
			unsubscribe();
		}
		try{


		unsubscribe =	firebase.auth().onAuthStateChanged(data=>{
			console.log('auth status - ', data);
			if(data){
				db.collection('users').doc(data.uid).get().then(
					userData=>{
						if(!userData.exists) {
							console.log(props);
							let userData =
								{
									uid: data.uid,
									email: props.formData.email.value,
									firstName: props.formData.firstName.value,
									secondName: props.formData.secondName.value,
									fullName: props.formData.firstName.value + ' ' + props.formData.secondName.value,
									companyName: props.formData.companyName.value
								};
							db.collection('users').doc(data.uid)
								.set(userData).then(()=>{
									dispatch(updateUser(userData));
									db.collection('companies').add({
										name: props.formData.companyName.value,
									}).then(docRef=>{
										let uid = userData.uid;
										db.collection('companies').doc(docRef.id+'/users/'+uid).set({uid});
										dispatch(clearFormData());
										dispatch(loading(false));
										window.location.pathname = '/index/user-dashboard';

									});
							}).catch(error=>{
								dispatch(loginError(error));
								dispatch(loading(false));
							});

							dispatch(loading(false));
							return;
						}

						dispatch(updateUser(userData.data()));
						dispatch(loading(false));

						if(window.location.pathname.includes('index')){
							return;
						}

						window.location.pathname = '/index/user-dashboard';
						dispatch(clearFormData());
					});

			} else {
				console.log('not signed in.');
				if(window.location.pathname !== '/login' && window.location.pathname !== '/employer-signup'  ){
					window.location.pathname = '/index/user-dashboard';
				}
				localStorage.clear();
				dispatch(loading(false));
			}
		 });
		} catch(error) {
			dispatch(loginError(error));
			dispatch(loading(false));
		}
	};




};
