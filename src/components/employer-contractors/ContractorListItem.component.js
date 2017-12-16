import React, { Component } from 'react';



class ContractorListItem extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<tr key={this.props.uid}>
				<th><i className="fa fa-user"></i></th>
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
				<td>{this.props.phoneNumber}</td>
			</tr>
		);
	}
}

export default ContractorListItem;