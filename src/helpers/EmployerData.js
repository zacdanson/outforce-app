import firebase from 'firebase';
import { db } from '../../firebase-config.js'
import { getContractorDetails } from './ContractorData';
import axios from 'axios';

const getEmployerUserData = () => {

};


const getEmployerWorkData = () =>{

};


export const getAllWorkLogs = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('workData').get().then(res=>{
			let workLogs = [];
			res.forEach(snapshot=>{
				if(!snapshot.exists){
					resolve([]);
				} else {
					let log = snapshot.data();
					log.id = snapshot.id;
					workLogs.push(log);
				}
			});
			resolve(workLogs);
		}).catch(error=>{
			reject({error});
		});
	});
};

export const formatDuration = duration =>{

	if(duration <= 60){
		return duration + ' mins';
	} else {
		let hours = duration/60;
		var minutes = (hours - parseInt(hours)) * 60;
		var mins = Math.round(minutes);
		return parseInt(hours) + ' hours ' + mins + ' mins';
	}
};

export const getWorkLogsRange = (companyId, startDate, endDate) => {
	return new Promise((resolve, reject)=>{
		getAllWorkLogs(companyId).then(result=>{
			if(!result){
				reject();
			} else {
				let logs = [];
				let duration = 0;
				result.forEach(log=>{
					if(parseInt(log.start) >= parseInt(startDate) && parseInt(log.start) <= parseInt(endDate)){
						duration+=parseFloat(log.total);
						logs.push(log);
					}
				});
				let totalDuration = formatDuration(duration);
				resolve({logs,  totalDuration });
			}
		});
	});
};

export const deleteWorkTypeById = (userId, companyId, workTypeId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('workTypes').doc(workTypeId).delete().then(res=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};

export const updateEmployerWorkTypes = (userId, companyId, workTypes) => {
	return new Promise((resolve, reject)=>{
		let batch = db.batch();
		workTypes.map(type=>{

			let ref = db.collection("companies").doc(companyId).collection('workTypes').doc(type.workTypeId);
			batch.set(ref, {workType: type.workType});
		});
		batch.commit().then(function () {
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});

	});
};

export const updateEmployerWorkType = (companyId, workTypeId, workType, duration) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('workTypes').doc(workTypeId).set({
			workType,
			duration
		}).then(result=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};


export const updateEmployerGlobalWorkName = (companyId, workName) => {
	return new Promise((resolve,reject)=>{
		db.collection("companies").doc(companyId).update({globalWorkName: workName}).then(result=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};

export const getEmployerGlobalWorkName = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).get().then(result=>{
			if(!result.exists){
				resolve();
				return;
			}
			let res = result.data();
			resolve(res.globalWorkName);
		}).catch(error=>{
			reject({error});
		});
	});
};

export const getEmployerWorkTypes = (userId, companyId) =>{

	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('workTypes').get()
			.then(snapshot=>{
				let workTypes = [];
				snapshot.forEach(doc=>{
					if(!doc.exists) {

						return;
					}

					let workTypeData = doc.data();
					workTypes.push({workTypeId: doc.id, workType: workTypeData.workType, duration: workTypeData.duration});

				});
				resolve(workTypes);
			}).catch(error=>{
				reject(error);
		});

	});
	};


const getEmployerContractors = () => {

};


export const deleteLog = (contractorId, logId, companyId) =>{
	return new Promise((resolve, reject)=>{

		db.collection('companies').doc(companyId).collection('workData').doc(logId).delete().then(res=>{
			db.collection('users').doc(contractorId).collection('workData').doc(logId).delete().then(res=>{
				resolve({res});
			}).catch(error=>{
				reject({error});
			});
		}).catch(error=>{
			reject({error});
		});

	});
};


export const getAllContractors = (userId, companyId) => {
	return new Promise((resolve, reject)=>{
		let contractors = [];
		db.collection('users').where('companyId', '==' , companyId ).where('userRole', '==', 'contractor').get()
			.then(snapshot=>{
				let promises = [];
				snapshot.forEach(doc=>{
					if(!doc.exists){
						reject({error: 'no users'});
						return;
					}
					let userData = doc.data();
					userData.uid = doc.id;
					promises.push(getContractorWorkData(doc.id));
					contractors.push(userData);
				});
				Promise.all(promises).then(res=>{
					_.each(res, (logs, index)=>{
						contractors[index].workData = logs;
						let days = moment.duration(moment().diff(moment(contractors[index].dateAdded, 'x'))).days();
						contractors[index].dailySessions = logs.length/days;
					});
					resolve(contractors);
				});
			}).catch(error=>{
			reject({error});
		});
	});
};

export const getContractorWorkData = (userId) => {
	return new Promise((resolve, reject)=>{
		db.collection('users').doc(userId).collection('workData').get()
			.then(snapshot=>{
				let workData = [];
				snapshot.forEach(doc=>{
					if(!doc.exists){

					}
					workData.push(doc.data());
				});
				resolve(workData);
			}).catch(error=>{
			reject({error});
		});
	});
};

export const updateLog = (logId, workTypeId, companyId) =>{

	return new Promise((resolve, reject)=>{

		db.collection('companies').doc(companyId).collection('workTypes').doc(workTypeId).get().then(snapshot=>{
			if(!snapshot.exists){
				reject({error: 'workType not found'});
				return;
			}
			let workTypeData = snapshot.data();
			db.collection('companies').doc(companyId).collection('workData').doc(logId).update({workTypeId: workTypeId, workType: workTypeData.workType }).then(res=>{
					resolve({res});
			}).catch(error=>{
				reject({error});
			});

		});


	});
};

export const sixMonthsWorkLogs = (companyId) => {
	return new Promise((resolve, reject)=>{
		let start = moment().startOf('month');
		let end = moment().endOf('month');
		let months = [];
		let promises = [];

		for(let i = 0; i<6; i++){
			months[i] = {
				month: moment(start).format('MMM'),
				start: moment(start).format('x'),
				end: moment(end).format('x')
			};
			start = moment(start).subtract(1, 'month');
			end = moment(start).endOf('month');
		}

		_.each(months, (month)=>{
			promises.push(getWorkLogsRange(companyId, month.start, month.end));
		});

		Promise.all(promises).then(result=>{
			_.each(result, (month, index)=>{
				months[index].workLogs = month.logs;
				months[index].totalDuration = month.totalDuration;
			});

			///resolve months.
			resolve({sixMonthLogs: months});
		});

	});
};


export const addWorkType = (companyId, workTypeId, workType) => {
	return new Promise((resolve, reject)=>{
			db.collection('companies').doc(companyId).collection('workTypes').doc(workTypeId).set({workType}).then(res=>{
				resolve({res});
			}).catch(error=>{
				reject({error});
			});
	});
};


export const saveEmployerJobRole = (jobRole, companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('jobRoles').doc(jobRole.id).set(
			jobRole
		).then(result=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};


export const addEmployerJobRole = (name, hourlyRate, companyId, assign) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('jobRoles').add({
			companyId,
			assign,
			hourlyRate,
			name
		}).then(result=>{
			db.collection('companies').doc(companyId).collection('jobRoles').doc(result.id).update({
				id: result.id
			}).then(res=>{
				resolve({success:true});
			}).catch(error=>{
				reject({error});
			});
		}).catch(error=>{
			reject({error});
		});
	});
}

export const deleteEmployerJobRole = (jobRole, companyId)=> {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('jobRoles').doc(jobRole.id).delete().then(result=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};

export const updateEmployerAssignCondition = (companyId, assignCondition)=>{
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).update({
			assignCondition
		}).then(res=>{
			resolve({success:true});
		}).catch(error=>{
			reject({error});
		});
	});
};

export const getEmployerAssignCondition = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).get().then(data=>{
			if(!data.exists){
				resolve({});
				return;
			}
			let companyData = data.data();

			resolve({assignCondition:companyData.assignCondition});
		}).catch(error=>{
			reject({error});
		});
	});
};

export const getAllContractorsInvoiceTotal = (companyId, start, end) => {
	return new Promise((resolve, reject)=>{
		let ids = [];
		let total = 0;
		let promises = [];
		db.collection('companies').doc(companyId).collection('contractors').get()
			.then(snapshot=>{
				snapshot.forEach(contractor=>{
					let contractorData = contractor.data();
					promises.push(db.collection('users').doc(contractorData.uid).collection('invoices').where('start', '>=', start).where('start', '<=', end).get());
				});

				Promise.all(promises).then(results=>{

					let total = 0;
					if(!results){
						resolve(total);
						return;
					}
					_.each(results, snapshot=>{
						_.each(snapshot.docs, snap=>{
							let invoice = snap.data();
							total+=parseFloat(invoice.total).toFixed(2);
						});
					});

					resolve(parseFloat(total).toFixed(2));

				});

		});

	});
};

export const getJobRoles = (companyId) => {
	return new Promise((resolve, reject)=>{
		db.collection('companies').doc(companyId).collection('jobRoles').get()
			.then(snapshot=>{
				let proms = [];
				snapshot.forEach(snap=>{
					proms.push(snap.data());
				});

				resolve(proms);
			})
	});
};


export const getProfits = (companyId, start, end) => {
	return new Promise((resolve, reject)=>{
		let logs = [];
		let profits = 0;
		let grossProfits = 0;

		getWorkLogsRange(companyId, start, end).then(workLogs =>{

			_.each(workLogs.logs, log=>{
				if(log.start >= start && log.start <=end){
					logs.push(log);
				}
			});

			_.each(logs, log=>{
				let price = parseInt(log.price);
				profits+=price;
			});

			getCosts(companyId, start, end ).then(contractorCosts=>{

				grossProfits = parseInt(profits)- parseInt(contractorCosts);				
				resolve({
					grossProfit: parseInt(grossProfits).toFixed(2),
					costs: parseInt(contractorCosts).toFixed(2),
					profit: parseInt(profits).toFixed(2)
				});
			});

		});

	});
};


export const getCosts = (companyId, start, end) => {
	return new Promise((resolve, reject)=>{
		
		let cost = 0;		
		
		
		getWorkLogsRange(companyId, start, end).then(workLogs=> {
			let logs =  workLogs.logs;			
			let promises = [];		
			_.each(logs, log=>{
				promises.push(
					new Promise((newResolve, newReject)=>{
						getContractorDetails(log.uid).then(details=>{					
							cost += parseInt(log.duration)/60*parseFloat(details.hourlyRate);							
							newResolve();
						});	
					})
				);			
			});								
			Promise.all(promises).then(res=>{				
				resolve(cost);
			});			
		});

	});
};


export const getEmployerFinanceTotals = (companyId, range ) => {
	
	return new Promise((resolve, reject)=>{
		let ranges = [];
		let promises = [];
		let start, end;
		if(range === 'week'){
			start = moment().startOf('week').format('x');
			end = moment(start, 'x').endOf('day').format('x');
			for(let i = 0; i<=6; i++){
				ranges.push({
					start,
					end,
					name: moment(start,'x').format('dd')
				});
				start = moment(start, 'x').add('1', 'days').format('x');
				end = moment(end, 'x').add('1', 'days').format('x');
			}
		} else if( range === 'month'){
			start = moment().startOf('month').format('x');
			end = moment(start, 'x').endOf('week').format('x');
			for(let i = 0; i<=4; i++){
				ranges.push({
					start,
					end,
					name: moment(start,'x').format('DD-MMM')
				});
				start = moment(start, 'x').add('1', 'week').format('x');
				end = moment(end, 'x').add('1', 'week').format('x');
			}
		} else if(range === 'year'){
			start = moment().startOf('year').format('x');
			end = moment(start, 'x').endOf('month').format('x');
			for(let i = 0; i<=11; i++){
				ranges.push({
					start,
					end,
					name: moment(start,'x').format('MMM')
				});
				start = moment(start, 'x').add('1', 'month').format('x');
				end = moment(start, 'x').endOf('month').format('x');
			}
		}

		_.each(ranges, (range, index)=>{
			promises.push(getProfits(companyId, range.start, range.end));
		});

		Promise.all(promises).then(results=>{
			let data = [];
			_.each(results, (result, index)=>{
				data.push({
					name: ranges[index].name,
					revenue: parseInt(result.profit),
					costs: parseInt(result.costs),
					profit: parseInt(result.grossProfit)
				});
			});
			resolve(data);
		});

	});

};
