import {
	DashboardCard
} from '../index';
import {
	Line,
	LineChart,
	XAxis,
	Tooltip,
	ResponsiveContainer
} from 'recharts';

const TotalRevenue = (props) => {

		return(
			<div>
				{ props.payPeriods[props.payPeriods.length-1] ? <DashboardCard
						name={"Revenue This Pay-Period "}
						figure={'£'+props.payPeriods[props.payPeriods.length-1].revenue}
						color="4"
					>
						<ResponsiveContainer width="100%" height={75}>
							<LineChart data={props.payPeriods} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
								<Line type="monotone" dataKey="revenue" stroke="#716aca" strokeWidth="3" dot={true} animationEasing='ease-in'/>
								<Tooltip />
								<XAxis dataKey="numPayPeriod" hide={true} />
							</LineChart>
						</ResponsiveContainer>

					</DashboardCard> : '' }

			</div>
		);

};

export default TotalRevenue;

