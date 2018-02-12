import React, { Component } from 'react';
import {
	Button,
	Input,
	Card
} from '../elements'


export const PersonalInformation = (props) => {

	return(
		<Card className="card" color="blue" cardHeader={props.contractor.fullName + "'s Details"}>
			<div className="container">
				<div className="form-group">
					<span>First Name</span>
					<Input value={props.contractor.firstName} onChange={(e)=>props.updateProperty('firstName', e)}/>
					<br></br>
					<span>Last Name</span>
					<Input value={props.contractor.secondName} onChange={(e)=>props.updateProperty('secondName', e)}/>
				</div>
				<div className="form-group">
					<span>Phone Number</span>
					<Input value={props.contractor.phoneNumber} placeholder={props.contractor.phoneNumber ? '' : 'no phone number added yet.'} onChange={(e)=>props.updateProperty('phoneNumber', e)}/>
				</div>
				<div className="form-group"><span>Email</span>
					<Input value={props.contractor.email} onChange={(e)=>props.updateProperty('email', e)}/>
				</div>
				<div className="form-group"><span>Address</span>
					<Input value={props.contractor.address} placeholder={props.contractor.address ? '' : 'no address added yet.'} onChange={(e)=>props.updateProperty('address', e)}/>
				</div>
				<div className="form-group" style={{display:'inline'}}>
					<div style={{display:'inline-block', marginRight:26}}>
						<span>Job Role</span>
						<Input value={props.contractor.jobRole} placeholder={props.contractor.jobRole ? '' : 'no job roles selected.'} onChange={(e)=>props.updateProperty('jobRole', e)}/>
					</div>
					<div style={{display:'inline-block'}}>
						<span>Pay Periods</span>
						<Input value={props.address} placeholder={props.contractor.payPeriods ? '' : 'no pay periods selected.'} onChange={(e)=>props.updateProperty('payPeriods', e)}/>
					</div>
				</div>
			</div>
			<small style={{marginLeft:24}}>{props.contractor.jobRoles && props.contractor.payPeriods ? '' : ' Please add job roles and pay periods within the Admin section.' }</small>
			<Button
				className="btn-success add-work-data-btn"
				icon={<i className="fa fa-save"></i>}
				text=" save"
				onClick={()=>props.onSave()}
				style={{marginRight:20}}
			/>
		</Card>
	);

};