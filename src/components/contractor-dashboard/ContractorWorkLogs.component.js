import React, { Component } from 'react';
import { Input, Button, Card} from '../elements';
import { Select } from 'grommet';
import
	DashboardCard
from '../dashboard-card/DashboardCard.component';


let types = [];

class  ContractorWorkLogs extends Component {


	constructor(props){
		super(props);

	}

	

	componentWillMount(){
		_.each(this.props.workTypes, (type, index)=>{
			types[index] = {
				label: type.workType,
				value: type.workTypeId
			};
		});
	}

	render(){
		let logs = _.orderBy(this.props.logs, ['start'],['desc']);
		return (
			<DashboardCard
                type="summary"
                header={'Recent '+ this.props.globalWorkName +'\'s'}
                headerIcon="fa-briefcase"           
                headerTools={[]}
                items={[]}
				color="3"
                className="full-height"                
                loading={false}
                content={
                    logs.length > 0 ?
                        <table className="table">
                            <thead>
                            <tr>
                                <th scope="col">Duration</th>
                                <th scope="col">Date</th>
                                <th scope="col">Work Type</th>                                
                            </tr>
                            </thead>
                            <tbody className="panel-body">
                            
                                {logs.map((log, index)=>{ 
                                    if(index > 6 ){
                                        return;
                                    }                                                               
                                    return (
                                        <tr> 
                                            <td>{ log.duration + ' mins' }</td>
                                            <td>{moment(log.start,'x').format('DD-MM-YYYY')}</td>
                                            <td>{log.workType}</td>
                                        </tr>
                                    );                            
                                })                        
                            }
                            
                        </tbody>
                        </table> : <div style={{textAlign:'center'}}> No Logs </div> } />			
		);	
	}
};


export default ContractorWorkLogs;