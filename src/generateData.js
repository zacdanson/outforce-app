import Axios from 'axios';


module.exports = () => {

	let data = {
		contractorName: "Zac danson",
		credits: "1",
		description: "",
		duration: 19,
		end:"",
		hourlyCost:"22.50",
		id:"417527",
		jobRole:"bX9NoqCSb94fEkgpwXvE",
		patientId:"-L8boVQOpnvT_zbBcZ87",
		price:48,
		start:1524413700000,
		uid:"532cb0f8-6641-4813-974b-bf771330c85d",
		workType:"Standard Appt",
		workTypeId:587,
	};

	let dataObj = {
	};

	let hourlyCost = '22.50';
	let uid = data.uid;
	let contractorName = data.contractorName;
	for(let i = 0; i <=60; i++){
		if(i === 20){
			hourlyCost='23.75';
			uid = 'sWPOsvSparfjKgVtGbHgCLvHZAp2';
			contractorName= 'Lorraine Bamblette';
		}
		if(i === 40){
			hourlyCost='25.00';
			uid = '9837ca59-c5cd-4628-a955-5f63e4712c0b';
			contractorName='Alli Gordon';
		}
		let newData = {
			id:parseInt(data.id)+i.toString(),
			uid: uid,
			contractorName: contractorName,
			credits: i%2 === 0 ? 1 : 2,
			duration:  i%2 === 0 ? 19 : 40,
			end: '',
			hourlyCost: hourlyCost,
			patientId:"-L8boVQOpnvT_zbBcZ87",
			price: i%2 === 0 ? 48 : 100,
			workType: i%2 === 0 ?  "Standard Appt": 'Screener',
			workTypeId: i%2 === 0 ? 587 : 555,
			start: data.start-=112700000
		};

		Axios.post('http://localhost:3001/workData/workData/multi-upload/e4f871dc-0f70-47b4-8a84-aafe8ae7ffdc', {
			workData:[
				newData
			]
		}).then(res=>{

		}).catch(error=>{
			console.log('error - ', error);
		});

	}



};