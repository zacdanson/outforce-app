import { Component } from 'react';
import {
	Input,
	Button,
	Modal,
	Card
} from '../elements/index';
import EmployerContractorsList from '../employer-contractors-list/EmployerContractorsList.component';
import AddContractor from './AddContractor.component';

class Contractors extends Component {

	constructor(props){
		super(props);

		this.state = ({
			selectedUsers: []
		});

	}

	selectUser(user, all){
		let selectedUsers = this.state.selectedUsers;
		if(all){
			_.each(this.props.contractors, contractor=>{
				let index = selectedUsers.indexOf(contractor.uid);
				if(index >= 0){
					selectedUsers.splice(index, 1);
				} else {
					selectedUsers.push(contractor.uid);
				}
			});
		} else {
			let index = selectedUsers.indexOf(user);
			if(index >= 0){
				selectedUsers.splice(index, 1);
			} else {
				selectedUsers.push(user);
			}
		}
		this.setState({
			selectedUsers
		});
	}


	render(){
		return(
			<Card cardHeader={'All Contractors'}
						headerTools={[
							<Button
								name=' Delete'
								icon={<i className="fa fa-trash" style={{marginRight:10}}></i>  }
								className="btn-secondary delete-contractor-btn"
								onClick={()=>this.props.deleteContractors(this.state.selectedUsers)}
							>
								Delete
							</Button>,
							<Button
								name=' Add'
								icon={<i className="fa fa-user-plus" style={{marginRight:10}}></i>  }
								openModal="true"
								className="btn-success add-contractor-btn"
								modalName="addContractorModal"
							>
								Add
							</Button>]}
			>
				<EmployerContractorsList
					user={this.state.user}
					history={this.props.history}
					contractors={this.props.contractors}
					onSelectUser={(userId, all)=>this.selectUser(userId, all)}
					showOpen={true}
					selectedUsers={this.state.selectedUsers}
		
				/>
				<AddContractor
					addContractor={(contractor)=>this.props.addContractor(contractor)}
				/>

			</Card>
		);
	}
}

export default Contractors;