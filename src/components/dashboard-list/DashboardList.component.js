const DashboardListItem = (props) =>{
	return(
		<div className="dashboard-list-item-container">
			<div className="dashboard-list-item">
				{props.icon}
			</div>
			<div className="dashboard-list-item-info">
				<div className="dashboard-list-item-name">{props.mainInfo}</div>
			</div>
			<div className="dashboard-list-item dashboard-list-item-ext">{props.ext}</div>
		</div>
	);
};
const DashboardList = (props) => {

	return(
		<div className="dashboard-list">
			<div className="dashboard-list-header-container">
				<div className="dashboard-list-header-text">{props.headerText}</div>
				<div className="dashboard-list-header-ext">{props.headerExt}</div>
			</div>
			{props.items.map((item, $index)=>{
				return(
					<DashboardListItem
						key={$index}
						icon={($index+=1) + '.'}
						mainInfo={item.fullName}
						subInfo={item.dateAdded}
						ext={item.workData.length}
					/>
				);
			})}
		</div>
	);

};

export default DashboardList;
