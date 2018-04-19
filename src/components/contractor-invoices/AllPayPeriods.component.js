import { Component } from 'react';
import {
	Card
} from '../elements';

const AllPayPeriods = (props) => {

			return(
				<Card
					headerStyle='card-header-color'
					cardHeader="Invoices For Each Pay Period"
				>
					{
						props.invoices.map((invoice, index) =>{
							return (
								<div key={index} className={props.selectedInvoice.id === invoice.id ? "all-pay-periods-item selected-invoice" : "all-pay-periods-item"} onClick={()=>{props.selectInvoice(invoice.id)}}>
									<span className="all-pay-periods-icon"><i className="fa fa-file"></i></span>
									<span>{moment(invoice.start, 'x').format('DD-MM-YYYY')}</span>
									<span> - </span>
									<span>{moment(invoice.end, 'x').format('DD-MM-YYYY')}</span>
								</div>
							);
						})
					}
				</Card>
			);
};


export default AllPayPeriods;