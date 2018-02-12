import React, { Component } from 'react';
import { checkAuth } from '../../actions/auth-actions/auth_actions';
import { connect } from 'react-redux';
const moment = require('moment');
import DashboardCard from '../dashboard-card/DashboardCard.component';
import DashboardList from '../dashboard-list/DashboardList.component';
import {
	getWorkTypes,
	getWorkLogs,
	getContractors,
	getWorkDataBetween,
	updateDashboardData,
	getGlobalWorkName
} from '../../actions/employer-data-actions/employer-data';
import Chart, {Area, Marker, MarkerLabel, HotSpots, Base, Layers, Axis, Grid, Line} from 'grommet/components/chart/Chart';

@connect((store)=>{
	return {
		user: store.user.userData,
		sidebar: store.main.sidebar,
		selectedTab: store.main.selectedTab,
		dashboardData: store.employer.dashboardData,
		workDataObject: store.employer.workDataObject
	}
})

export class EmployerDashboard extends Component {

		constructor(props){
			super(props);
		}

		componentWillMount(){
			console.log(this.props);
			this.updateDashboardData('loggedWork', {label: 'daily', value:0 }, this.props.user.companyId);
			this.props.dispatch(updateDashboardData('contractors',this.props.user.companyId));
			this.props.dispatch(getGlobalWorkName(this.props.user.companyId));
		}

		updateDashboardData(dashboardItem, range){
			let start = moment();
			start.hours('0');
			start.minutes('0');
			start.seconds('0');
			let end = moment().add(1, 'days');
			end.hours('0');
			end.minutes('0');
			end.seconds('0');
			if ( range.label === 'weekly'){
				end = moment().add(1,'weeks');
			} else if(range.label === 'monthly'){
				end = moment().add(1,'months');
			}
			let dates = { from: moment(start).format('x'), to: moment(end).format('x') };
			this.props.dispatch(updateDashboardData(dashboardItem, this.props.user.companyId, dates, range));
		}

    render() {
			let { loggedWork, contractors } = this.props.dashboardData;
			let workName = this.props.workDataObject.globalWorkName !== undefined ? this.props.workDataObject.globalWorkName : 'Work';
			return (
            <div className={this.props.sidebar === 'max' ? 'home-content home-content-max employer-dashboard' : 'home-content home-content-min employer-dashboard' }>
							<div className="row">
								<div className="col">
									<DashboardCard
										name={"All "+ workName + "'s "}
										figure={loggedWork.totalLogs}
										color="2"
									/>
								</div>
								<div className="col">
									<DashboardCard
										name={"Total Number of Contractors"}
										figure={contractors.contractorCount }
										color="1"
									/>
								</div>
								<div className="col-lg-5">
									<DashboardCard
										type="summary"
										header={ workName + " Summary"}
										headerIcon="fa-briefcase"
										selectOptions={this.props.dashboardData.ranges}
										selectVal={loggedWork.range}
										selectChange={(e)=>this.updateDashboardData('loggedWork', e.option)}
										items={[
											{name:"Number Of " + workName + "'s ", figure: loggedWork.workLogs.length},
											{name:'Total Hours Worked', figure: loggedWork.totalDuration }
											]}
									>
										<Chart full={true}>
											<Base width="full" height="small" />
											<Layers>
												<Line values={[70, 0, 20, 100, 60]} activeIndex={4} />
												<HotSpots count={12} onActive={(e)=>console.log(e)}/>
											</Layers>
										</Chart>

									</DashboardCard>
									<DashboardCard
										type="summary"
										header="Contractor Data Summary"
										headerIcon="fa-users"
										selectOptions={this.props.dashboardData.ranges}
										selectVal={loggedWork.range}
										selectChange={(e)=>this.updateDashboardData('loggedWork', e.option)}
										items={[
											{name:'Newest Contractor', figure: contractors.newestContractor },
											{name:'Total Number of Contractors', figure: contractors.contractorCount },
											{name:'Top Performer', figure: contractors.topPerformer }
										]}
									>
									</DashboardCard>
									<DashboardCard type="container">
										<DashboardList items={contractors.contractorList} headerText="Contractor Performance" headerExt={workName+"'s"}/>
									</DashboardCard>
								</div>
							</div>
            </div>
        );
    }
}

export default EmployerDashboard;