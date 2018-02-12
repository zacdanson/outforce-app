import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
const uuid = require('uuid4');
import axios  from 'axios';
import swal from 'sweetalert';
const BASE_URL = 'http://localhost:3001';
import { loadingAnimation } from '../main_actions';
import { getContractorObject, saveContractorObject} from '../../helpers/ContractorData';
import { getAllContractors } from '../../helpers/EmployerData';

import moment from 'moment';


export const addContractor = (userId, phoneNumber, email, name, employerName, companyName, companyId ) => {
	return (dispatch) => {
		dispatch(loadingAnimation(true));
		try{

			if(!email || !name || !phoneNumber){
				swal({
					icon: "error",
					title: 'Error',
					text: 'all contractors details required.',
					buttons:false,
					timer: 2000,
					className: 'swal-custom-padding'

				});
				return;
			}

			db.collection('users').add({
				linkActive: true,
				registered: false,
				phoneNumber,
				email,
				name,
				userRole: 'contractor',
				companyId,
				dateAdded: moment().format('x')
			}).then(data=>{

				let id = data.id;
				console.log('invited contractor.', id);
				db.collection('companies').doc(companyId+'/contractors/'+id).set({
					uid: id
				}).then(data=>{
					dispatch(clearFormData());
					dispatch(loadingAnimation(false));
					swal({
						title: 'Added Contractor',
						text: 'an invitation has been send to join Outforce',
						icon: "success",
						buttons:false,
						timer:2000,
						className: 'swal-custom-padding'

					});
					axios.post(BASE_URL+'/contractors/contractor/invite/'+id,{
						contractorName: name,
						email,
						employerName,
						companyName,
						companyId
					});
				});
			}).catch(error=>{
				console.log(error);
			});

		} catch(error){
			console.log(error);
			swal({
				title: 'error',
				text: error,
				icon: "error",
				buttons:false,
				timer:2000,
				className: 'swal-custom-padding'

			});
		}
	};
};


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


export const selectUser = (users, user) => {
	let index = users.indexOf(user.uid);
	if(index > -1){
		users.splice(index, 1);
		$('#'+user.uid).removeClass('selected-user');
		$('#'+user.uid+'row').removeClass('selected-user-row');
	} else {
		users.push(user.uid);
		$('#'+user.uid).addClass('selected-user');
		$('#'+user.uid+'row').addClass('selected-user-row');
	}
	return {
		type: 'SELECT_USER',
		payload: users
	};
};


export const getContractor = (id, callback) => {
	return (dispatch) => {
		console.log('here');
			getContractorObject(id).then(obj=>{
				console.log(obj);
				dispatch(updateContractorObject('workLogs', obj.logs));
				dispatch(updateContractorObject('details', obj.details));
				dispatch(loadingAnimation(false));
				callback();
		});
	}
};



export const addWorkData = (companyId, total, start, end, workType, contractorId, notRegistered) => {
	console.log(companyId, total, start, end, workType, contractorId, notRegistered);

	return (dispatch) => {
		db.collection('companies').doc(companyId).collection('workData')
			.add({
				uid:contractorId,
				workType,
				companyId,
				total,
				start,
				end
		}).then(docRef=>{

			db.collection('users').doc(contractorId).collection('workData').doc(docRef.id).set({logId: docRef.id});
			swal({
				title: 'Added Work Data.',
				text:'',
				icon: "success",
				buttons:false,
				timer: 3500,
				className: 'swal-custom-padding'
			});
			dispatch(loadingAnimation(false));
			dispatch(clearWorkDataForm());

		}).catch(error=>{
			console.log(error);
			swal({
				title: 'error',
				text: error,
				icon: "error",
				buttons:false,
				timer:2000,
				className: 'swal-custom-padding'
			});
			dispatch(loadingAnimation(false));
		});

	};
};

export const saveContractor = (object) =>{
	let contractor = {...object};
	contractor['fullName'] = contractor.firstName + ' ' + contractor.secondName;
	return dispatch => {
		saveContractorObject(contractor).then(res=> {
			if(!res.error){
				dispatch(updateContractorObject('details',res.details));
			}
		});
	};
};


export const updateContractorObject = (property, value) =>{
	return {
		type:'UPDATE_CONTRACTOR_OBJECT',
		payload: { property, value}
	}
};

export const clearWorkDataForm = () => {
	return {
		type:'CLEAR_WORKDATA_FORM',
		payload: {}
	};
};


export const updateWorkDataForm = (property, value) => {
	return {
		type: 'UPDATE_WORKDATA_FORM',
		payload: { property, value }
	};
};

export const updateSelectedDuration = (time, type) =>{
	return {
		type: 'UPDATE_SELECTED_DURATION',
		payload: { time, type }
	};
};

export const updateContractorsList = (contractors) => {
	return {
		type: 'UPDATE_CONTRACTORS_LIST',
		payload: contractors
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
