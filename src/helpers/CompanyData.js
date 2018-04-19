import { db } from '../../firebase-config';
import firebase from 'firebase';
let storage = firebase.storage();
import axios from 'axios';
const BASE_URL = 'http://localhost:3001';

export const updateEmployerAutoSendInvoices = (companyId, status)=>{
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).update({
			autoSendInvoices: status
		}).then(res=>{
			resolve({success: true});
		}).catch(error=>{
			reject(error);
		});
	});
};

export const getCompanyDataObject = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).get().then(snapshot=>{
			if(!snapshot.exists){
				resolve('no company data');
			}
			let companyData = snapshot.data();
			resolve(companyData);
		}).catch(error=>{
			reject({error});
		});
	});
};


export const updateCompanyPayPeriod = (selectedPayFrequency, companyId) =>{
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).update({
			selectedPayFrequency
		}).then(data=>{
			resolve(data);
		}).catch(error=>{
			reject(error);
		});
	});
};

export const getCompanyPayPeriod = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).get().then(snapshot=>{
			let companyData = snapshot.data()
			let selectedPayPeriod = companyData.selectedPayFrequency;
			let thisWeek = moment().isoWeek();
			let end;
			let start = moment()
				.isoWeek(thisWeek)
				.startOf('isoWeek');
			let numPayPeriod;

			if(selectedPayPeriod === 'weekly'){
				end = start
					.clone()
					.add(1, 'weeks')
					.subtract(1, 'days').format('x');
				numPayPeriod = parseInt(thisWeek) + 1;
			} else if(selectedPayPeriod === 'bi-weekly'){
				end = start
					.clone()
					.add(2, 'weeks')
					.subtract(1, 'days').format('x');
				numPayPeriod = parseInt(thisWeek / 2) + 1;
			} else if(selectedPayPeriod === 'monthly'){
				start = moment().startOf('month');
				end = moment().endOf('month').format('x');
				numPayPeriod = moment().month();
			}

			start = moment(start).format('x');
			resolve({start, end, numPayPeriod});

		}).catch(error=>{
			reject(error);
		});
	});
};


export const getCompanyJobRoles = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('jobRoles').get().then(snapshot=>{
			let jobRoles = [];
			snapshot.forEach(doc=>{
				if(!doc.exists){
					console.log('no job roles for this company.');
				}
				jobRoles.push(doc.data());
			});
			resolve(jobRoles);
		}).catch(error=>{
			reject({error});
		});
	});
};

export const saveCompanyDetails = (companyDetails) =>{
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyDetails.companyId).update(companyDetails).then(res=>{
			resolve({success:true});
		}).catch(error=>{
			reject(error);
		});
	});
};

export const saveCompanyLogo = (companyId, file, fileName) => {
	return new Promise((resolve, reject)=>{
		let imgRef = storage.ref().child('companies/'+companyId+'/logo/'+fileName);
		imgRef.put(file)
			.then(snap=>{
				console.log('uploaded file successfully.');
				imgRef.getDownloadURL()
					.then(function(url) {
						console.log('url - ', url);
						db.collection('companies').doc(companyId).update({
							logoUrl: url
						}).then(res=>{
							resolve(imgRef)
						}).catch(error=>{
							reject(error);
						});
					});
			}).catch(error=>{
				reject(error);
		});
	});
};