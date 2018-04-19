import { db } from '../../firebase-config';
import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export const getContractorDetails = (uid) => {
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(uid).get().then(docRef=>{
			console.log('get contractor');
			if(!docRef.exists){
				console.log('no contractor.....');
				getPendingContractor(uid).then(reponse=>{
					if(response.error){
						reject(response.error);
					}
					resolve(response);/**/
				});
				return console.log('no contractor found with that id. Checking pending invites.');
			} else {

				resolve(docRef.data());
			}
		}).catch(error=>{
			reject({error});
		})
	});
};


export const getPendingContractor = (uid) => {
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(uid).get().then(docRef=>{
			if(!docRef.exists){
				reject({error:'no contractor found with that id'});
				return console.log('no contractor found with that id. Check users table.');
			} else {
				resolve(docRef.data());
			}
		}).catch(error=>{
			reject({error});
		});
	});
};

export const getContractorObject = (uid) => {
	return new Promise((resolve, reject)=>{
		getContractorDetails(uid).then(data=>{
				getUserWorkData(data.companyId, data.uid).then(logs=>{
					let contractor = data;
					contractor.workLogs = logs;
					getContractorJobRole(uid).then(result=>{
						if(result.error){
							resolve(contractor);
						}
						contractor.hourlyRate = result.hourlyRate;
						contractor.jobRoleName = result.name;
						resolve(contractor);
					});
				});
		});
	});
};

export const getContractorJobRole = (uid) => {
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(uid).get().then(snapshot=>{
			if(!snapshot.exists){
				resolve({error:'no data for this user.'});
			}
			let userData = snapshot.data();
			console.log(userData);
			if(!userData.jobRole){
				resolve({error: 'no user job role yet.'});
				return;
			} else {
				db.collection('companies').doc(userData.companyId).collection('jobRoles').doc(userData.jobRole).get().then(snap=>{
					if(!snap.exists){
						resolve({error:'no job role assigned to this user.'});
					}
					resolve(snap.data());
				}).catch(error=>{
					reject(error);
				});
			}
		});
	});
};


export const getUserWorkData = (companyId, userId, from, to ) => {
	return new Promise((resolve, reject)=>{
		let workData = [];
		if(!from || !to ){
			db.collection('companies').doc(companyId).collection('workData').where('uid', '==', userId).get()
				.then(snapshot=>{
					snapshot.forEach(log=>{
						if(!log.exists){
							console.log('no logs');
							return;
						}
						let logData = log.data();
						logData.id = log.id;
						workData.push(logData);
					});
					resolve(workData);
				}).catch(error=>{
					reject({error});
			});
		} else {
			///get from to times.
		}
	});
};


export const saveContractorObject = (object) =>{
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(object.uid).update(object).then(res=>{
			resolve(object);
		}).catch(error=>{
			reject({error});
		});
	});
};



export const addContractor = (user, employerName, companyId, companyName) => {
	return new Promise((resolve, reject)=>{
		try{
			let { email, name, phoneNumber} = user;
			if(!email || !name || !phoneNumber){
				reject({error});
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
					resolve({data});
					axios.post(BASE_URL+'/contractors/contractor/invite/'+id,{
						contractorName: name,
						email,
						employerName,
						companyName,
						companyId
					});
				}).catch(error=>{
					reject({error});
				});
			}).catch(error=>{
				reject({error});
			});

		} catch(error){
			reject({error});
		}
	});
};


export const deleteContractors = (users, companyId) =>{
	return new Promise((resolve, reject)=> {
		let promises = [];
		console.log(users);
		users.map(userId=>{
			promises.push(db.collection('users').doc(userId).delete());
			promises.push(db.collection('companies').doc(companyId + '/contractors/'+ userId).delete());
		});
		Promise.all(promises).then(result=>{
			if(!result.error){
				resolve({success:true});
			} else {
				reject({error:result.error})
			}
		});
	});
};


export const addWorkData = (workData, contractorData) => {
	return new Promise((resolve, reject)=>{
		let { uid, companyId, fullName, hourlyRate } = contractorData;
		let { workType, workTypeId, total, start, end } = workData
		let price = parseFloat(total)/60*parseFloat(hourlyRate);
		db.collection('companies').doc(companyId).collection('workData')
			.add({
				uid,
				workType,
				workTypeId,
				companyId,
				total,
				start,
				end,
				contractorName: fullName,
				price
			}).then(docRef=>{
			db.collection('users').doc(uid).collection('workData').doc(docRef.id).set({logId: docRef.id}).then(res=>{
				resolve({success:true});
			});
		}).catch(error=>{
			reject({error});
		});
	});
};


export const getInvoices = (uid) => {
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(uid).collection('invoices').orderBy('start','desc').get().then(snap=>{
			let invoices = [];
			snap.forEach(snapshot=>{
				console.log('invoice - ', snapshot.data());
				invoices.push({
					invoice: snapshot.data(),
					id: snapshot.id
				});
			});
			resolve(invoices);
		}).catch(error=>{
			reject(error);
		});
	});
};