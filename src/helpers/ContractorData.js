import { db } from '../../firebase-config';


export const getContractor = (uid, callback) => {
	return (dispatch) => {
		db.collection('users').doc(uid).get().then(docRef=>{
			console.log('get contractor');
			if(!docRef.exists){
				dispatch(getPendingContractor(uid, callback));
				return console.log('no contractor found with that id. Checking pending invites.');
			} else {
				callback(docRef.data());
			}
		})
	};
};


export const getPendingContractor = (uid, callback) => {
	return (dispatch) => {
		db.collection('pendingInvites').doc(uid).get().then(docRef=>{
			if(!docRef.exists){
				return console.log('no contractor found with that id. Check users table.');
			} else {
				callback(docRef.data());
			}
		});
	};
};


export const getAllContractors = (userId, companyId, callback) => {
	return (dispatch) => {

		let contractors = [];
		db.collection('users').where('companyId', '==' , companyId ).where('userRole', '==', 'contractor').get()
			.then(snapshot=>{

				console.log(snapshot);
				snapshot.forEach(doc=>{
					if(!doc.exists){
						return;
					}
					let userData = doc.data();
					userData.uid = doc.id;
					contractors.push(userData);
				});

				db.collection('pendingInvites').where('companyId', '==', companyId).get()
					.then(snapshot=>{
						console.log(snapshot);
						snapshot.forEach(doc=>{
							if(!doc.exists){
								return;
							}
							let userData = doc.data();
							userData.uid = doc.id;
							contractors.push(userData);
						});

						callback(contractors);

					});

			});
	};
};


export const getUserWorkData = (companyId, userId, callback, from, to ) => {
	return (dispatch) => {
		let workData = [];
		if(!from || !to ){
			db.collection('workData').where('uid', '==', userId).get()
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
					callback(workData);
				});
		} else {
			///get from to times.
		}
	};
};