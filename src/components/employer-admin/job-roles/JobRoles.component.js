import JobRolesList from './JobRolesList.component';
import AddJobRole from './AddJobRole.component';
import ChangeConditions from './ChangeConditions.component';
import JobRoleModal from './JobRoleModal.component';
import {
	Card
} from '../../elements';

const JobRoles = (props) => {
		return(
			<div className="job-roles row">
				<div className="col-7">
					<Card cardHeader="Job Roles">
						<JobRolesList
							assignCondition={props.assignCondition}
							globalWorkName={props.globalWorkName}
							jobRoles={props.jobRoles}
							deleteJobRole={(jobRoleId)=>props.deleteJobRole(jobRoleId, props.user.companyId)}
							saveJobRole={(id, name, hourlyRate, assign, roleRequirements)=>props.saveJobRole(id, name, hourlyRate, assign, roleRequirements, props.user.companyId)}
						/>
					</Card>
				</div>
				<div className="col-5">
					<AddJobRole
						addJobRole={(name, hourlyRate)=>props.addJobRole(name, hourlyRate, props.user.companyId)}
					/>
					<ChangeConditions
					/>
					<JobRoleModal
						condition={props.assignCondition}
						globalWorkName={props.globalWorkName}
						updateAssignCondition={(condition)=>props.updateAssignCondition(condition)}
					/>
				</div>
			</div>
		);
}

export default JobRoles;