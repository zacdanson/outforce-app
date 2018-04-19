import React, { Component } from 'react';
import { Input } from '../elements';
import { Select } from 'grommet';
import { WorkLogListItem } from './WorkLogListItem.component';

const WorkLogs = (props) => {
	console.log(props);
	let types = [];
	_.each(props.workTypes, (type, index)=>{
		types[index] = {
			label: type.workType,
			value: type.workTypeId
		};
	});
	let logs = _.orderBy(props.logs, ['start'],['desc']);
	return (
		<div>
			{ logs.length > 0 ?
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
					{logs.map((log, index)=>{
						return <WorkLogListItem
							key={index}
							index={index}
							log={log}
							types={types}
							removeLog={(contractorId, logId)=>props.removeLog(contractorId, logId)}
							updateLog={(logId, workTypeId)=>props.updateLog(logId, workTypeId)}
					/> })}
					</tbody>
				</table> : <div style={{textAlign:'center'}}> No Logs </div> }
		</div>
	);

};

export default WorkLogs;