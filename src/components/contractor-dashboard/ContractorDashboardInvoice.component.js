import React, {Component} from 'react';
import AllPayPeriods from '../contractor-invoices/AllPayPeriods.component';


class ContractorDashboardInvoice extends Component {

    constructor(props){
        super(props);

        this.state = ({
            invoice: this.props.invoices && this.props.invoices.length > 0 ? this.props.invoices[0] : ''
        });
    }

    selectInvoice(id){

		_.each(this.props.invoices, (invoice)=>{
			if(invoice.id === id){
				this.setState({
					invoice: invoice
                });
                window.open("data:application/octet-stream;charset=utf-16le;base64,"+invoice.base64, "_blank");
			}
        });
        
    
	}

    render(){
        return (
            <AllPayPeriods
                invoices={this.props.invoices}
                selectedInvoice={this.state.invoice}
                selectInvoice={(index)=>this.selectInvoice(index)}
                header="Download Invoices"
            />
        );
    }

}

export default ContractorDashboardInvoice;