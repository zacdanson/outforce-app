import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../elements';
class ContractorListItem extends Component{

	constructor(props){
		super(props);
	}


	render(){
		return(
			<tr className={this.props.index %2 != 0 ? 'contractor-list-item table_row_dark' : ''} onClick={this.props.onClick} id={this.props.uid+'row'} style={this.props.selected ?{ background:'#ebebeb', cursor:'pointer'} : {cursor:'pointer'}}>
				<td className="table_cell"><i id={this.props.uid} className={this.props.selected ? 'fa fa-user selected-user':'fa fa-user'}></i></td>
				<td className="table_cell">{this.props.name || <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.email || <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.phoneNumber || <small>not yet added</small> }</td>
				<td className="table_cell">{this.props.registered ?  <i className="fa fa-check" style={{color:'green'}}></i> : <i className="fa fa-times" style={{color:'red'}}></i>}</td>
				{this.props.showOpen ? <td className="table_cell"> <NavLink to={"/index/employer/employer-contractors/"+this.props.uid+"/contractor-details"}><Button name="openContractor" text="open" className="btn-sm btn-primary" onClick={()=>console.log('openUser')}/></NavLink> </td> : ''}
			</tr>
		);
	}
}

export default ContractorListItem;