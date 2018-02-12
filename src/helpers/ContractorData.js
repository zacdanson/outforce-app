import { db } from '../../firebase-config';


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
			console.log(data);
			getUserWorkData(data.companyId, data.uid).then(logs=>{
				resolve({logs, details: data});
			});
		});
	});

};



export const getUserWorkData = (companyId, userId, from, to ) => {
	return new Promise((resolve, reject)=>{
		let workData = [];
		if(!from || !to ){
			db.collection('companies').doc(companyId).collection('workData').where('uid', '==', userId).get()
				.then(snapshot=>{
					console.log(snapshot);
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
			resolve({details: object});
		}).catch(error=>{
			reject({error});
		});
	});
};