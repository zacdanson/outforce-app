import React, { Component } from 'react';


class Modal extends Component{

	constructor(props){
		super(props);
	}

	render(){
		return(
			<div className="modal fade" id={this.props.name} tabIndex="-1" role="dialog" aria-labelledby={this.props.label} aria-hidden="true">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							 <h5 className="modal-title" id={this.props.label}>	{this.props.titleIcon}  {this.props.modalTitle}</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							{this.props.children}
						</div>
						<div className="modal-footer">
							{this.props.closeBtn ? <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button> : ''}
							{this.props.rightBtn ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.rightBtnOnClick }>{this.props.rightBtnIcon} {this.props.rightBtnName }</button> : '' }
						</div>
					</div>
				</div>
			</div>
		);
	}

}

export default Modal;