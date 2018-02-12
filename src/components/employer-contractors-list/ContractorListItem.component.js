import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class ContractorListItem extends Component{

	constructor(props){
		super(props);
	}


	render(){
		return(
			<tr className={this.props.index %2 != 0 ? 'contractor-list-item table_row_dark' : ''} onClick={this.props.onClick} id={this.props.uid+'row'} style={{cursor:'pointer'}} onDoubleClick={this.props.onDblClick}>
				<td className="table_cell"><i id={this.props.uid} className='fa fa-user'></i></td>
				<td className="table_cell">{this.props.name.length > 0 ? this.props.name : <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.email.length > 0 ? this.props.email : <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.phoneNumber ? this.props.phoneNumber : <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.registered ?  <i className="fa fa-check" style={{color:'green'}}></i> : <i className="fa fa-times" style={{color:'red'}}></i>}</td>
		 </tr>
		);
	}
}

export default ContractorListItem;