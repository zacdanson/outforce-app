import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
const uuid = require('uuid4');
import axios  from 'axios';
import swal from 'sweetalert';
const BASE_URL = process.env.API_URL;
import { loadingAnimation } from '../main_actions';
import { getContractorObject, saveContractorObject} from '../../helpers/ContractorData';

import moment from 'moment';


export const getContractors = (uid, companyId) => {
	return (dispatch) => {
			getAllContractors(uid, companyId).then(contractors=>{
				dispatch(loadingAnimation(false));
				dispatch(updateContractorsList(contractors));
			});
	};
};

export const deleteContractors = (users, contractors) =>{
	return (dispatch) => {
		dispatch(loadingAnimation(true));
		users.map(userId=>{
			db.collection('users').doc(userId).delete()
				.then(()=>{
					contractors.map((con, index)=>{
						let compId;
						if(con.uid === userId){
							compId = con.companyId;
							db.collection('companies').doc(compId + '/contractors/'+ userId).delete();
							swal({
								title: 'Removed Contractor',
								text:'the contractor will no longer have access to OutForce.',
								timer: 2000,
								buttons: false,
								icon: 'success',
								className: 'swal-custom-padding'

							});
						}
				})
			});
			dispatch(loadingAnimation(false));
		});
	};
};

export const clearSelectedUsers = () => {
	return {
		type: 'CLEAR_SELECTED_USERS',
		payload: {}
	};
};


export const getContractor = (id, callback) => {
	return (dispatch) => {

			getContractorObject(id).then(obj=>{
				dispatch(loadingAnimation(false));
				callback(obj);
		});
	}
};

export const saveContractor = (object) =>{
	let contractor = {...object};
	contractor['fullName'] = contractor.firstName + ' ' + contractor.secondName;
	return dispatch => {
		saveContractorObject(contractor).then(res=> {
			if(!res.error){
				dispatch(updateContractorObject('details', res.details));
				swal({
					type:'success',
					title: 'Successfully Updated Contractor Details!',
					text: 'The new details of the contractor have been saved',
					timer: 2000,
					buttons: false,
					icon:'success',
					className: 'swal-custom-padding'
				});
			}
		});
	};
};

