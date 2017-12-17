import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
const uuid = require('uuid4');
import axios  from 'axios';

const BASE_URL = 'http://localhost:3001';

export const addContractor = (userId, phoneNumber, email, name, employerName, companyName, companyId ) => {
	return (dispatch) => {
		try{
			db.collection('pendingInvites/').add({
				linkActive: true,
				seen:false,
				phoneNumber,
				email,
				name,
				userRole: 'contractor',
				companyId
			}).then(data=>{
				let id = data.id;
				console.log('invited contractor.', id);
				db.collection('users').doc(userId+'/contractors/'+id).set({
					uid: id
				}).then(data=>{
					axios.post(BASE_URL+'/contractors/contractor/invite/'+id,{
						contractorName: name,
						email,
						employerName,
						companyName
					});
				});
			}).catch(error=>{
				console.log(error);
			});

		} catch(error){
			console.log(error);
		}
	};

};

export const bindAddContractorInput = (value, property) => {
	return {
		type:'BIND_ADD_CONTRACTOR_INPUT',
		payload: {value: value, property: property}
	};
};


export const clearFormData = () => {
	return{
		type: 'CLEAR_ADD_CONTRACTOR_FORM',
		payload: {}
	};
};
