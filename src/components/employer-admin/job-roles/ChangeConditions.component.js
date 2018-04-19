import {
	Button,
	Card
} from '../../elements';

const changeCondition = (props) => {
	return (
		<Card cardHeader={'Assign Job Role Conditions'} style={{paddingBottom:10}}>
			<div>Job Role Conditions automatically assigns Job Roles to your Contractors. Job Roles must have 'Auto' Assign to be automatically assigned.</div>
			<Button className="btn btn-secondary pull-right" onClick={()=>$('#jobRoleModal').modal('toggle')}>Edit Conditions</Button>
		</Card>
	);
};

export default changeCondition;