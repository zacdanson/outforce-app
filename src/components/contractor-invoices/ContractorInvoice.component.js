import { Component } from 'react';
import Invoice from '../invoice/Invoice.component';
import ContractorDataActions from '../../actions/ContractorDataActions';
import  LoadingAnimation  from '../loading-animation/LoadingAnimation.component';
import AllPayPeriods from './AllPayPeriods.component';

class ContractorInvoice extends Component {

	constructor(props){
		super(props);
		this.state = {
			invoice: this.props.invoices && this.props.invoices.length > 0 ? this.props.invoices[0] : ''
		};
	}

	selectInvoice(id){
		console.log(id);
		_.each(this.props.invoices, (invoice)=>{
			if(invoice.id === id){
				this.setState({
					invoice: invoice
				});
			}
		});
	}

	render(){
		console.log(this.props.invoices);
		return(
			<div className="row" style={{height:'100%'}}>
				<div className="col-lg-3">
					<AllPayPeriods
						invoices={this.props.invoices}
						selectedInvoice={this.state.invoice}
						selectInvoice={(index)=>this.selectInvoice(index)}
					/>
				</div>

				<div className="col-lg-8">
					{ this.state.invoice ?
						<Invoice
							invoice={this.state.invoice.base64}
						/> : ' no invoices. '
					}

				</div>

			</div>
		);
	}

}

export default ContractorInvoice;