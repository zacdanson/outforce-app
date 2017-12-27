import React, { Component } from 'react';


export const WorkLogListItem = (props) => {
		return(
			<tr className="work-log-list-item">
				<td>{props.date}</td>
				<td>{props.duration}</td>
				<td>{props.start}</td>
				<td>{props.end}</td>
				<td>{props.workType}</td>
			</tr>
		);
};
