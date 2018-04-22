import React, {Component} from 'react';
import ContractorListItem from './ContractorListItem.component';



const EmployerContractorsList = (props) => {

			return (
				<div>
					{ props.contractors && props.contractors.length > 0  ?
					<table className="table">
						<thead>
						<tr >
							{props.hideCheckbox ? '' : <th scope="col"><input id="select-all-users" onClick={()=>props.onSelectUser('', true)} type="checkbox" className="check-box"/></th> }
							<th className="table_cell" scope="col">Name</th>
							<th className="table_cell" scope="col">Email</th>
							<th className="table_cell" scope="col">Phone Number</th>
							<th className="table_cell" scope="col">Registered</th>
							{props.showOpen ? <th className="table_cell" scope="col"></th> : ''}
						</tr>
						</thead>
							<tbody className="panel-body">
							{	props.contractors.map((user, index) => {
									return <ContractorListItem
									history={props.history}
									key={user.uid}
									index={index}
									uid={user.uid}
									name={user.fullName || user.name}
									email={user.email}
									phoneNumber={user.phoneNumber}
									registered={user.registered}
									onClick={() => props.onSelectUser(user.uid, false)}
									showOpen={props.showOpen}
									selected={props.selectedUsers.indexOf(user.uid) >= 0}
									/>
								}) }
							</tbody>
					</table> :
					<div style={{textAlign: 'center'}}> No Contractors </div> }
				</div>
			);
};


export default EmployerContractorsList;