import React, { Component } from 'react';
import moment from 'moment';
import {
	Button,
	Input,
	Card,
	Select
} from '../elements'
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';

export const WorkData = (props) => {

	return (
			<div>
					<div className="form-group">
						<h5 className="work-data-header">Work Type</h5>
						{props.workTypes.length < 1 ? 'No Work Types - Please add work types <a href="/index/employer/employer-admin">here</a>' :
						<Select
							options={props.workTypes}
							optionName='workType'
							optionKey='workTypeId'
							onChange={props.handleWorkType}
							selected={props.workTypes.workType}

						/> }
					</div>

					<div className="form-group">
						<h5  className="work-data-header">Date Worked</h5>
						<DatePicker
							value={props.dateSelected }
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

			</div>
	);

};