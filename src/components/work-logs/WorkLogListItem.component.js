import { Select } from 'grommet';
import {
	Button
} from '../elements';

export const formatDuration = duration =>{
	console.log(' duration - ', duration );
	if(duration <= 60){
		return duration + ' mins';
	} else {
		let hours = duration/60;
		var minutes = (hours - parseInt(hours)) * 60;
		var mins = Math.round(minutes);
		return parseInt(hours) + ' hours ' + mins + ' mins';
	}
};

export const WorkLogListItem = (props) => {

		let start = moment(props.log.start, 'x');
		let startString = moment(start).locale('en').format('DD-MM-YYYY, H:mm A').toString();
		let end = moment(props.log.end , 'x');
		let endString = moment(end).locale('en').format('DD-MM-YYYY, H:mm A').toString();
		let log = props.log;
		return(
			<tr className={props.index %2 != 0 ? 'work-log-list-item table_row_dark' : ''}>
				<td>{formatDuration(log.total)}</td>
				<td>{startString}</td>
				<td>{endString}</td>
				<td>
					<Select placeHolder={'None'}
											multiple={false}
											options={props.types}
											value={{value:log.workTypeId, label: log.workType}}
											onChange={(e)=>props.updateLog(log.id, e.value.value)}
					/>
				</td>
				<td><Button className="btn-danger"  onClick={()=>props.removeLog(log.uid, log.id)}><i className="fa fa-trash"></i></Button></td>
			</tr>
		);
};
