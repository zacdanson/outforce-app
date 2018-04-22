import { Component } from 'react';
import {
	Button
} from '../elements'
import {
	DashboardCard
} from '../index';
import {
	NavLink
} from 'react-router-dom';

class ContractorsSummary extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
				<DashboardCard
				type="summary"
				header="Contractor Data Summary"
				headerIcon="fa-users"
				toolsType="button"
				name="viewContractors"
				headerTools={
					<NavLink to='/index/employer/employer-contractors'>
						<Button name={'viewContractors'} onClick={()=>{}}>view</Button>
					</NavLink>
				}
				items={[
					{name:'Newest Contractor', figure: getNewestContractor(this.props.contractors) },
					{name:'Total Number of Contractors', figure: this.props.contractors.length },
					{name:'Top Performer', figure: getTopPerformer(this.props.contractors)}
				]}/>

		);
	}

}
export default ContractorsSummary;

const getNewestContractor = (contractors) => {
	let latestDate = 0;
	let newestContractor = '';
	_.each(contractors, (contractor, index)=>{
		if(latestDate < contractor.dateAdded){
			latestDate = contractor.dateAdded;
			newestContractor = contractor.fullName || '';
		}
	});
	return newestContractor;
};

const getTopPerformer = (contractors) => {

	_.each(contractors, contractor => {
		let days = moment.duration(moment().diff(moment(contractor.dateAdded, 'x'))).days();
		contractor.dailySessions = contractor.workLogs ? contractor.workLogs.length/days : 0;
	});

	let performanceArray = _.orderBy(contractors, ['dailySessions'], ['desc']);

	return performanceArray[0] ? performanceArray[0].fullName : '';

};