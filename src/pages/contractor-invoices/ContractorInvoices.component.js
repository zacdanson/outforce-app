import { Component } from 'react';
import { connect } from 'react-redux';
import ContractorInvoice from '../../components/contractor-invoices/ContractorInvoice.component';
import CompanyDataActions from '../../actions/CompanyDataActions';
import ContractorDataActions from '../../actions/ContractorDataActions';

import { Card } from '../../components/elements';

@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		company: store.firebaseData.companyData,
		sidebar: store.main.sidebar,
		loading: store.main.loading,
		invoices: store.contractor.invoices
	}
})


class ContractorInvoices extends Component {

	constructor(props) {
		super(props);
		console.log('prop=', props);
	}

	componentDidMount(){
		this.props.dispatch(CompanyDataActions.payPeriodsToDate(this.props.company.companyId));
		this.props.dispatch(ContractorDataActions.getContractorInvoices(this.props.user.uid));
	}

	render(){
		return(
			<div className={this.props.sidebar === 'max' ? 'home-content home-content-max' : 'home-content home-content-min' }>
				<div className="row" style={{height:'100%'}}>
					<div className="col-lg-12">
						<ContractorInvoice
							invoices={this.props.invoices}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default ContractorInvoices;