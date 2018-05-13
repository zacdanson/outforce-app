import {Component} from 'react';
import DateTime from 'grommet/components/DateTime';
import { Button, Card } from '../elements';

class PayPeriods extends Component{

	constructor(props){
		super(props);
		this.state = ({
			selectedPayFrequency: this.props.selectedPayFrequency,
			sendInvoice: false,
			currentPayPeriod: ''
		});
	}

	selectPayPeriod(payPeriod){
		this.setState({
			selectedPayFrequency: payPeriod
		});
	}

	savePayPeriods(){
		if(this.state.selectedPayFrequency === ''){
			swal({
				text: 'Please First Select a Pay Period Option.',
				icon:'error'
			});
			return;
		}
		this.props.updatePayPeriodDetails(this.state.selectedPayFrequency);
	}

	componentWillReceiveProps(nextProps){
		this.setState({
			selectedPayFrequency: nextProps.selectedPayFrequency,
			currentPayPeriod: nextProps.payPeriod
		});
	}

	render(){

		return(
			<Card cardHeader={'Change Pay Frequency'} color="blue" className="custom-row-item">
				<div className="row" style={{paddingTop:'20px'}}>
					<div className="form-group col-lg-6">
						<div>
							<label style={{paddingBottom:'10px'}}>Select Frequency</label>
						</div>
						<Button
							name="weekly"
							text="weekly"
							size="small"
							style={{marginRight:5, fontSize:'1rem', padding:'.5rem 1.25rem'}}
							onClick={()=>this.selectPayPeriod('weekly')}
							className={this.state.selectedPayFrequency === 'weekly' ? "btn-success":"btn-primary"}
						/>
						<Button
							name="bi-weekly"
							size="small"
							text="bi-weekly"
							style={{marginRight:5, fontSize:'1rem', padding:'.5rem 1.25rem'}}
							onClick={()=>this.selectPayPeriod('bi-weekly')}
							className={this.state.selectedPayFrequency === 'bi-weekly' ? "btn-success":"btn-primary"}
						/>
						<Button
							name="monthly"
							text="monthly"
							style={{marginRight:5, fontSize:'1rem', padding:'.5rem 1.25rem'}}
							onClick={()=>this.selectPayPeriod('monthly')}
							size="small"
							className={this.state.selectedPayFrequency === 'monthly' ? "btn-success":"btn-primary"}
						/>
					</div>
					<div className="col-lg-6">
						<div>
							<label style={{paddingBottom:'10px'}}>Current Pay Period</label>
							<div className="mui--text-dark">
								<span>{moment(this.props.payPeriod.start, 'x').format('MMM DD-YYYY')}</span>
								<span style={{marginRight:10, marginLeft:10}}>to</span>
								<span>{moment(this.props.payPeriod.end, 'x').format('MMM DD-YYYY')}</span>
							</div>
						</div>
					</div>
					<div className="col-lg-12">
						<Button
							name="Save Pay-Periods"
							text="Save Pay-Periods"
							className="btn-success pull-right"
							onClick={()=>this.savePayPeriods()}
						/>
					</div>
				</div>
			</Card>
		);
	}

};

export default PayPeriods;