import { Component } from 'react';
import { Card } from '../elements';
import CheckBox from 'grommet/components/CheckBox';
import Invoice from '../invoice/Invoice.component';

class Invoices extends Component {
	constructor(props){
		super(props);
		this.state = ({
			sendInvoice: props.autoSendInvoices || false
		});
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			sendInvoice: nextProps.autoSendInvoices
		});
	}

	updateAutoSendInvoice(){
		let status = this.state.sendInvoice ? false : true;

		this.setState({
			sendInvoice: status
		});

		this.props.updateAutoSendInvoice(status);
	}



	render(){
		return(
			<div className="invoices-container">
				<div className="row">
					<div className="col-lg-3">
						<Card cardHeader="Send Contractor Invoices">
							<CheckBox label={this.state.sendInvoice ? 'Automatically' : 'Manual'}
												toggle={true}
												checked={this.state.sendInvoice}
												onChange={(e)=>this.updateAutoSendInvoice(e.target.value)}
							/>
						</Card>
					</div>
					<div className="col-lg-9">
						<Invoice
							user={this.props.user}
							company={this.props.company}
						/>
					</div>
				</div>
			</div>
		);
	}
}



export default Invoices;
