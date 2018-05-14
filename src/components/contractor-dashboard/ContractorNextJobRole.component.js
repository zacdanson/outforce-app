import
	DashboardCard
from '../dashboard-card/DashboardCard.component';

const ContractorNextJobRole = (props) => {
	return (
			<DashboardCard
				name={props.globalWorkName+'\'s Until Achieved '+ props.nextJobRole.name}
				color="3"
				className="full-height"
				contentClassName="full-height"
				figure={props.nextJobRole.leftToObtain || 0}
				loading={props.loading}
			/>
	);
};

export default ContractorNextJobRole;