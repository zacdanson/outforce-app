import { formatDuration } from '../../helpers/EmployerData';

export const WorkLogListItem = (props) => {

		let start = moment(props.start, 'x');
		let startString = moment(start).locale('en').format('DD-MM-YYYY, H:mm A').toString();
		let end = moment(props.end , 'x');
		let endString = moment(end).locale('en').format('DD-MM-YYYY, H:mm A').toString();


		return(
			<tr className={props.index %2 != 0 ? 'work-log-list-item table_row_dark' : ''}>
				<td>{formatDuration(props.duration)}</td>
				<td>{startString}</td>
				<td>{endString}</td>
				<td>{props.workType}</td>
				<td onClick={props.removeLog}><i className="fa fa-trash" style={{color:'red', cursor:'pointer'}}></i></td>
			</tr>
		);
};
