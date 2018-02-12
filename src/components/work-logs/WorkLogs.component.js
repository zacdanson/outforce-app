import React, { Component } from 'react';
import { Input } from '../elements';
import { Select } from 'grommet';
import { WorkLogListItem } from './WorkLogListItem.component';
import {  removeLog, updateLogWorkType} from '../../actions/employer-data-actions/employer-data';

const deleteLog = (props,log)=>{
	props.dispatch(removeLog(log.uid, log.companyId, log.id));
};

const updateLog = (props, log, workTypeId)=>{
	props.dispatch(updateLogWorkType(log.id, workTypeId, log.companyId));
};

export const WorkLogs = (props) => {
	console.log(props);
	let types = [];
	_.each(props.workTypes, (type, index)=>{
		types[index] = {
			label: type.workType,
			value: type.workTypeId
		};
	});
	return (
		<div>
			{ props.logs.length > 0 ?
				<table className="table">
					<thead>
					<tr>
						<th scope="col">Duration</th>
						<th scope="col">Start</th>
						<th scope="col">End</th>
						<th scope="col">Work Type</th>
						<th scope="col"></th>
					</tr>
					</thead>
					<tbody className="panel-body">
					{props.logs.map((log, index)=>{
						return <WorkLogListItem
							key={log.id}
							index={index}
							duration={log.total}
							start={log.start}
							end={log.end}
							removeLog={()=>deleteLog(props, log)}
							workType={
								<Select placeHolder={props.selectPlaceholder ? props.selectPlaceholder : 'None'}
												multiple={false}
												options={types}
												value={{value:log.workTypeId, label: log.workType }}
												onChange={(e)=>updateLog(props, log, e.target.value)}
								/>}
					/> })}
					</tbody>
				</table> : <div style={{textAlign:'center'}}> No Logs </div> }
		</div>
	);

};