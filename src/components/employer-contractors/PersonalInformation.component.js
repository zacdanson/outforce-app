import React, { Component } from 'react';
import {
	Button,
	Input
} from '../elements'


export const PersonalInformation = (props) => {

	return(
		<div className="panel col-md">
			<div className="panel-heading">
				<h4>Personal Information</h4>
			</div>
			<div className="panel-body container">
				<div className="form-group">
					<span>Name</span>
					<Input value={props.name}/>
				</div>
				<div className="form-group">
					<span>Phone Number</span>
					<Input value={props.phoneNumber}/>
				</div>
				<div className="form-group"><span>Email</span>
					<Input value={props.email}/>
				</div>
				<div className="form-group"><span>Address</span>
					<Input value={props.address} placeholder={props.address ? '' : 'no address added yet.'}/>
				</div>
			</div>
		</div>
	);

};