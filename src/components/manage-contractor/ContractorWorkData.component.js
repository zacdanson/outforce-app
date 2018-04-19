import {
	Card,
	Button,
	Modal,
	Input
} from '../elements';
import  WorkLogs from '../work-logs/WorkLogs.component';
import { AddWorkData } from './index';

const ContractorWorkData = (props) => {
		return(
			<Card color="blue" cardHeader={props.contractor.fullName + "'s Work Logs"}
						headerTools={[
								<Button
									name="upload-work-data"
									text=" Upload Work Data"
									icon={<i className="fa fa-upload"></i>}
									openModal="true"
									modalName="uploadWorkDataModal"
									style={{float:'right'}}
									className="btn btn-warning"/>,
								<Button
									name="add-work-data"
									text=" Add Work Data"
									icon={<i className="fa fa-plus"></i>}
									openModal="true"
									modalName="addWorkData"
									style={{float:'right', marginRight:10}}
									size="small"
									className="btn btn-success"/>
								]}
						className="col">
						<WorkLogs
							logs={props.contractor.workLogs}
							workTypes={props.workTypes}
							removeLog={(contractorId, logId) => props.deleteWorkLog(contractorId,logId, props.contractor.companyId)}
							updateLog={(logId, workTypeId) => props.updateWorkLog(logId, workTypeId, props.contractor.companyId)}
						/>

						<Modal
							name="uploadWorkDataModal"
							titleIcon={<i className="fa fa-key"></i>}
							modalTitle="Upload Work Data"
							closeBtn={true}>
							<div>
								<p className="add-contractor-modal-info">The following API key can be used to interact with the OutForce API, which will automatically add work data to your company.</p>
								<p>This API key, should only be used for this account, and will be linked to your company. Click here to read the API documentation. </p>
								<div className="form-group">
									<Input name="userApiKey" className="work-data-api-key" value={props.user ? props.user.apiKey : 'no api key found.'} onChange={()=>console.log('change.')} />
								</div>
							</div>
						</Modal>

					<AddWorkData
						addWorkData={(workData)=>props.addWorkData(workData)}
						workTypes={props.workTypes}
					/>

			</Card>
		);
};

export default ContractorWorkData;