import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Input,
	Modal,
	Tabs
} from '../../components/elements'
import {
	WorkData,
	JobDetails,
	PersonalInformation,
	ContractorWorkData
} from '../../components/manage-contractor';
import ContractorInvoice from '../../components/contractor-invoices/ContractorInvoice.component';
import ContractorDataActions from '../../actions/ContractorDataActions';
import WorkDataActions from '../../actions/WorkDataActions';
import {loading} from '../../actions/main_actions';
import  Loader from '../../components/loading-animation/Loader.component';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		sidebar: store.main.sidebar,
		workTypes: store.firebaseData.workTypes,
		contractors: store.firebaseData.contractors,
		loading: store.main.loading,
		contractor:store.contractor.contractor,
		globalWorkName: store.firebaseData.globalWorkName,
		invoices: store.contractor.invoices
	}
})


class ManageContractor extends Component {

	constructor(props){
		super(props);
	}

	componentWillMount(){
		let id = this.props.match.params.id;
		console.log('paramss - ', this.props.match.params);
		this.props.dispatch(ContractorDataActions.getContractorData(id));
		this.props.dispatch(ContractorDataActions.getContractorInvoices(id));

	}

	componentDidMount(){
		this.props.dispatch({
			type:'UPDATE_CONTRACTOR_OBJECT',
			payload: ''
		});
	}

	render(){
		let tabs = [
			{
				name: 'CONTRACTOR DETAILS',
				url: '/contractor-details',
				active: this.props.match.params.tab === 'contractor-details'
			},
			{
				name: 'WORK LOGS',
				url: '/work-logs',
				active: this.props.match.params.tab === 'work-logs'
			},
			{
				name: 'INVOICES',
				url: '/invoices',
				active: this.props.match.params.tab === 'invoices'
			}
		];
		return(
			<div  className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				<Button
					className="btn-secondary backBtn"
					icon={<i className="fa fa-backward"></i>}
					text=" back"
					onClick={()=>this.props.history.push('/index/employer/employer-contractors')}
				/>

				{ this.props.contractor ? <Tabs
						horizontal={true}
						baseUrl={"/index/employer/employer-contractors/"+this.props.match.params.id}
						tabs={tabs}>
					{ tabs[0].active ?
						<PersonalInformation
							globalWorkName={this.props.globalWorkName}
							contractor={this.props.contractor}
							saveContractorDetails={(details)=>this.props.dispatch(ContractorDataActions.updateContractorDetails(details))}
						/>
					: ''}
					{ tabs[1].active ?
						<div className="row">
							<ContractorWorkData
								addWorkData={(workData)=>this.props.dispatch(ContractorDataActions.addContractorWorkData(workData, this.props.contractor))}
								user={this.props.user}
								workTypes={this.props.workTypes}
								contractor={this.props.contractor}
								updateWorkLog={(logId, workTypeId, companyId)=>this.props.dispatch(ContractorDataActions.updateContractorWorkLog(logId, workTypeId, companyId, this.props.contractor.uid))}
								deleteWorkLog={(contractorId, logId, companyId)=>this.props.dispatch(ContractorDataActions.deleteContractorWorkLog(contractorId, logId, companyId))}
							/>
						</div> : ''}
					{
						tabs[2].active ?
							<div className="row" style={{height:'100%'}}>
								<ContractorInvoice
									invoices={this.props.invoices}
								/>
							</div> : ''
					}
				</Tabs> : <Loader size="small" /> }

			</div>
		);

	}



}

export default ManageContractor;