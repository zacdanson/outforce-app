import
	DashboardCard
from '../dashboard-card/DashboardCard.component';

const ContractorAllTimeLogs = (props) => {
	return (
			<DashboardCard
				className="full-height"
				contentClassName="full-height"
				name={'All Completed ' + props.globalWorkName+'\'s'}
				color="4"
				figure={props.contractor.workLogs.length}
				loading={props.loading}
			/>
	);
};

export default ContractorAllTimeLogs;