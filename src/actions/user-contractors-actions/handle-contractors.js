import firebase from 'firebase';
import { db } from '../../../firebase-config.js'
const uuid = require('uuid4');
import axios  from 'axios';
import swal from 'sweetalert';
const BASE_URL = 'http://localhost:3001';
import { loadingAnimation } from '../main_actions';
import { getAllContractors, getContractor } from '../../helpers/ContractorData';
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
					timer: 2000
				});
				return;
			}

			db.collection('pendingInvites').add({
				linkActive: true,
				registered: false,
				phoneNumber,
				email,
				name,
				userRole: 'contractor',
				companyId
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
						timer:2000
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
				timer:2000
			});
		}
	};
};


export const getContractors = (uid, companyId) => {
	return async (dispatch) => {
		dispatch(getAllContractors(uid, companyId, (contractors)=>{
			dispatch(loadingAnimation(false));
			dispatch(updateContractorsList(contractors));
		}));
	};
};

export const deleteContractors = (users, contractors) =>{
	return (dispatch) => {
		dispatch(loadingAnimation(true));
		users.map(userId=>{
			db.collection('users').doc(userId).delete();
			db.collection('pendingInvites').doc(userId).delete()
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
							icon: 'success'
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


export const setContractor = (id) => {
	return (dispatch) => {
		dispatch(getContractor(id, (contractor)=>{
			console.log(contractor);
			contractor.uid = id;
			dispatch({
				type:'SET_CONTRACTOR',
				payload: contractor
			});
			dispatch(loadingAnimation(false));
		}));
	}
};


export const updateWorkType = (workType) => {
	return {
		type: 'UPDATE_WORK_TYPE',
		payload: workType
	};
};





export const addWorkData = (companyId,date, total, start, end, workType, contractorId, notRegistered) => {

	let formatDate = moment(date).format('ll');
	return (dispatch) => {
		db.collection('workData')
			.add({
				uid:contractorId,
				workType,
				date:formatDate,
				total,
				start,
				end
		}).then(docRef=>{
			let workDataRef;

			if(!notRegistered){
				workDataRef = db.collection('users');
			} else {
				workDataRef = db.collection('pendingInvites');
			}
			workDataRef.doc(contractorId).collection('workData').doc(docRef.id).set({logId: docRef.id});
			swal({
				title: 'Added Work Data.',
				text:'',
				icon: "success",
				buttons:false,
				timer: 3500
			});
			dispatch(loadingAnimation(false));
			dispatch(clearWorkData());

		}).catch(error=>{
			console.log(error);
			swal({
				title: 'error',
				text: error,
				icon: "error",
				buttons:false,
				timer:2000
			});
			dispatch(loadingAnimation(false));
		});

	};
};

export const clearWorkData = () => {
	return {
		type:'CLEAR_WORK_DATA',
		payload: {}
	};
};

export const updateWorkLogs = (logs) => {
	return {
		type:'UPDATE_WORK_LOGS',
		payload: logs
	};
};


export const updateSelectedDate = (date) =>{
	console.log('date---', date);
	return {
		type: 'UPDATE_SELECTED_DATE',
		payload: date
	};
};

export const updateSelectedDuration = (time, type) =>{
	console.log(time);
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
