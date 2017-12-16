import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
const uuid = require('uuid4');


export const addContractor = (userId, phoneNumber, email, name, message) => {
	return (dispatch) => {
		try{

			let uid = uuid();

			db.collection('users').doc('contractors/'+uid).set({
				uid
			}).then(data=>{
				console.log('created contractor - ', data);
				db.collection('pendingInvites/').doc(uid).set({
					linkActive: true,
					seen:false,
					phoneNumber: phoneNumber,
					email: email,
					name: name
				}).then(data=>{
					console.log('invited contractor.');

				});

			});



		} catch(error){
			console.log(error);
		}
	};

};