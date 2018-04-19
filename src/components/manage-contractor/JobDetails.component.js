import React, { Component } from 'react';
import {
	Button,
	Input
} from '../elements'


const JobDetails = () => {
	return (

		<div className="panel col-md">
			<div className="panel-heading">
				<h4>Job Details</h4>
			</div>
			<div className="panel-body container row">
				<div className="form-group col-md">
					<span>Job Role/Title </span>
					<Input />
				</div>
				<div className="form-group col-md">
					<span>Paid Every</span>
					<Input/>
				</div>
			</div>
		</div>

	);
};

export default JobDetails;