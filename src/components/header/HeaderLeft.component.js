import React, {Component} from 'react';



class HeaderLeft extends Component{
    render(){


        return(
          <div className="headerLeftStyle">
			<img src="../../assets/images/full-logo.png" className="logoStyle"/>
			<div className="menuStyle">
				<i className="fa fa-bars iconStyle"  aria-hidden="true"></i>
			</div>
		  </div>
        );
    }

}

export default HeaderLeft;