import React, {Component} from 'react';
import ContractorListItem from './ContractorListItem.component';



export const EmployerContractorsList = (props) => {
			return (
				<div>
					{ props.contractors && props.contractors.length > 0  ?
					<table className="table">
						<thead>
						<tr >
							{props.hideCheckbox ? '' : <th scope="col"><input id="select-all-users" onClick={props.selectAllUsers()} type="checkbox" className="check-box"/></th> }
							<th className="table_cell" scope="col">Name</th>
							<th className="table_cell" scope="col">Email</th>
							<th className="table_cell" scope="col">Phone Number</th>
							<th className="table_cell" scope="col">Registered</th>
						</tr>
						</thead>
							<tbody className="panel-body">
							{	props.contractors.map((user, index) => {
									return <ContractorListItem
									key={user.uid}
									index={index}
									uid={user.uid}
									name={user.fullName || user.name}
									email={user.email}
									phoneNumber={user.phoneNumber}
									registered={user.registered}
									onClick={() => props.onSelectUser(user)}
									onDblClick={() => props.onDoubleClick(user)}
									/>
								}) }
							</tbody>
					</table> :
					<div style={{textAlign: 'center'}}> No Contractors </div> }
				</div>
			);
};