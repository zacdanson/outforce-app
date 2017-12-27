import React, { Component } from 'react';
import moment from 'moment';
import {
	Button,
	Input
} from '../elements'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';

export const WorkData = (props) => {
	return (
			<div className="panel col-md">
				<div className="panel-heading">
					<Button
						className="btn-primary uploadDataBtn"
						icon={<i className="fa fa-upload"></i>}
						text=" upload"
				/>
					<h4>Work Data </h4>
				</div>
				<div className="panel-body container">

					<div className="form-group">
						<h5 className="work-data-header">Work Type</h5>
						<Input
							value={props.workType}
							onChange={props.handleWorkType}
						/>
					</div>

					<div className="form-group">
						<h5  className="work-data-header">Date Worked</h5>
						<DatePicker
							selected={ props.dateSelected}
							onChange={props.dateOnChange}
							dateFormat="LL"
							className="form-control"
						/>
					</div>

					<div className="form-group">
						<h5  className="work-data-header">Duration Of Work</h5>
						<div>
							<div style={{marginBottom:'10px'}}> From:
								<TimePicker timeMode="24"
														time={props.startTime}
														onTimeChange={props.startTimeChange}
														theme="classic"
								/>
							</div>
							<div> To:
								<TimePicker timeMode="24"
														time={props.endTime}
														onTimeChange={props.endTimeChange}
														theme="classic"
								/>
							</div>
						</div>
					</div>

					<Button
						className="btn-success add-work-data-btn"
						icon={<i className="fa fa-plus"></i>}
						text=" add"
						onClick={props.addWorkData}
					/>

				</div>
			</div>
	);

};