import { Component } from 'react';
import {
	Input,
	Button
} from '../elements';


class ContractorSignupForm extends Component{

	constructor(props){
		super(props);

		this.state = ({
			contractor: {},
			formValid: false
		});
	}

	bindInputValue(property, value){
		let newState = this.state.contractor;
		newState[property] = value;
		this.setState({
			contractor: newState
		});
		const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		let {email, password, firstName, secondName, phoneNumber, addressLine, city, county, postcode} = this.state.contractor;
		if(email.match(mailformat) || password!=='' || firstName!=='' || secondName!==''|| phoneNumber!=='' || addressLine!== ''|| city!=='' || county!=='' || postcode!=='') {
			this.setState({formValid: true});
		}
	}

	handleContractorSignup(){
		this.props.signupContractor(this.state.contractor);
	}

	render(){
		return(
			<div className="signup-form-container">
				<div className="signup-header-container">
					<h1 className="signup-header">OutForce</h1>
					<small style={{color:'#ebebeb'}}>welcome to OutForce</small>
				</div>
				<Input name="email" className="signup-email-input" placeholder="email" onChange={(e)=>this.bindInputValue('email', e.target.value)} type="email"/>
				<Input name="password" className="signup-password-input" placeholder="password" onChange={(e)=>this.bindInputValue('password', e.target.value)} type="password"/>
				<Input name="firstname" className="signup-password-input" placeholder="first name" onChange={(e)=>this.bindInputValue('firstName', e.target.value)} />
				<Input name="secondname" className="signup-password-input" placeholder="second name" onChange={(e)=>this.bindInputValue('secondName', e.target.value)}/>
				<Input name="phonenumber" className="signup-password-input" placeholder="phone number" onChange={(e)=>this.bindInputValue('phoneNumber', e.target.value)}/>
				<Input name="address" className="signup-password-input" placeholder="address line 1" onChange={(e)=>this.bindInputValue('address', e.target.value)}/>
				<Input name="city" className="signup-password-input" placeholder="city" onChange={(e)=>this.bindInputValue('city', e.target.value)}/>
				<Input name="county" className="signup-password-input" placeholder="county" onChange={(e)=>this.bindInputValue('county', e.target.value)}/>
				<Input name="postcode" className="signup-password-input" placeholder="postcode" onChange={(e)=>this.bindInputValue('postcode', e.target.value)}/>

				{ this.state.formValid ? <Button className="form-control btn-success" text="Signup" id="signupBtn" onClick={()=>this.handleContractorSignup()}/> : <Button className="form-control btn-success" text="Signup" id="signupBtn" disabled={true}/>}
				<div className="signupErrorMsg">{this.props.error }</div>
				<div className="small-link">
					<small>
						<a href="/login">
							Already registered? Login here.
						</a>
					</small>
				</div>
			</div>
		);
	}

}

export default ContractorSignupForm;