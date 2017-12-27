import React, { Component } from 'react';

import { WorkLogListItem } from './WorkLogListItem.component';

export const WorkLogs = (props) => {
	return (
		<div>
			{ props.logs.length > 0 ?
				<table className="table">
					<thead>
					<tr>
						<th scope="col">Date</th>
						<th scope="col">Duration</th>
						<th scope="col">Start</th>
						<th scope="col">End</th>
						<th scope="col">Work Type</th>
					</tr>
					</thead>
					<tbody className="panel-body">
					{props.logs.map((log)=>{
						return <WorkLogListItem
							key={log.id}
							date={log.date}
							duration={log.total}
							start={log.start}
							end={log.end}
							workType={log.workType}
						/>})}
					</tbody>
				</table> : <div style={{textAlign:'center'}}> No Logs </div> }
		</div>
	);
};