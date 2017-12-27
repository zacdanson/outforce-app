import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class ContractorListItem extends Component{

	constructor(props){
		super(props);
	}


	render(){
		return(
			<tr className="contractor-list-item" onClick={this.props.onClick} id={this.props.uid+'row'} style={{cursor:'pointer'}} onDoubleClick={this.props.onDblClick}>
				<th><i id={this.props.uid} className='fa fa-user'></i></th>
				<td>{this.props.name}</td>
				<td>{this.props.email}</td>
				<td>{this.props.phoneNumber}</td>
				<td>{this.props.registered ? <i className="fa fa-times" style={{color:'red'}}></i> : <i className="fa fa-check" style={{color:'green'}}></i>}</td>
		 </tr>
		);
	}
}

export default ContractorListItem;