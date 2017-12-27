import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';
import { handleSidebar } from '../../actions/main_actions';
import { connect } from 'react-redux';


@connect(store=>{
	return{
		sidebar: store.main.sidebar,
		user: store.user.userData
	}

})

class HeaderLeft extends Component{

		handleSidebar(){
			if(this.props.sidebar === 'max'){
				this.props.dispatch(handleSidebar('min'));
			} else {
				this.props.dispatch(handleSidebar('max'));
			}
		}


    render(){
        return(
					<div className="headerLeftStyle">
						<NavLink to={this.props.user.userRole === 'employer' ? "/index/employer/employer-dashboard" : "/index/contractor/contractor-dashboard"}>
							<img src="../../../assets/images/full-logo.png" className="logoStyle"/>
						</NavLink>
						<div className="menuStyle">
							<i id="menuIcon" className="fa fa-bars iconStyle"  aria-hidden="true" onClick={this.handleSidebar.bind(this)}></i>
						</div>
					</div>
        );
    }

}

export default HeaderLeft;