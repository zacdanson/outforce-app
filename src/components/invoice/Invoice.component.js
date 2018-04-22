import { Component } from 'react';



class Invoice extends Component{

	constructor(props){
		super(props)
	}

	render(){

		return (
			<div className="invoice-container">
					<object width="100%" height="100%" data={'data:application/pdf;base64, '+this.props.invoice} type="application/pdf" charSet="ascii"/>
			</div>
		);
	}

}

export default Invoice;

