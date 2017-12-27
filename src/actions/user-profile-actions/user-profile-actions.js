import firebase from 'firebase';
let storage = firebase.storage();
import { db } from '../../../firebase-config.js'
import {
	handleError,
	updateUser
} from '../helper-actions/helper-actions';
import { loading } from '../main_actions';

export const bindInputValue = (value, property) => {
	return {
		type:'BIND_INPUT_VALUE',
		payload: {value: value, property: property}
	};
};

export const bindProfilePicture = (uid, fileRef) => {
	return (dispatch)=>{
		 fileRef.getDownloadURL()
			.then(function(url) {
				console.log('url - ', url);
				dispatch({
					type: 'BIND_INPUT_VALUE',
					payload: { value: url, property: 'profilePicture'}
			});
			db.collection("users").doc(uid).update({
				profilePicture: url
			});
		}).catch(function(error) {
			// Handle any errors
			 console.log('error', error);
			dispatch(handleError(error));
		});
	};

};

export const saveProfile = (userData) => {
	return (dispatch) => {
		dispatch(loading(true));
		try{
			db.collection('users').doc(userData.uid).update({
				firstName: userData.firstName,
				secondName: userData.secondName,
				email: userData.email,
				fullName: userData.firstName + ' ' + userData.secondName,
				companyName: userData.companyName
			}).then(data=>{
				console.log('successfully updated profile.');
				dispatch(updateUser(userData));
				dispatch(loading(false));
			});
		}	catch (error){
			dispatch(handleError(error.code));
			dispatch(loading(false));
		}
	};
};

export const uploadProfilePicture = (uid, file, fileName) => {
	return async (dispatch) => {
		dispatch(loading(true));
		try{
			let imgRef = storage.ref().child('users/'+uid+'/profilePicture/'+fileName);
			imgRef.put(file)
				.then(snap=>{
					console.log('uploaded file successfully.');
					const url = dispatch(bindProfilePicture(uid,imgRef));
					dispatch(loading(false));
				});
		} catch(err){
			dispatch(handleError(err.code));
			dispatch(loading(false));
		}
	};
};
