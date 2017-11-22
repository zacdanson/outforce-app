import React, {Component} from 'react';



class HeaderLeft extends Component{
    render(){

        const headerLeftStyle = {
          width:200,
					height:75,
					display: 'flex',
					alignItems: 'center'
        };

        const logoStyle = {
					padding:20
				};

        const menuStyle = {
        	marginLeft: 90
				};

        const iconStyle = {
        	fontSize: 20
				};

        return(
          <div style={headerLeftStyle}>
						<img src="../../assets/images/full-logo.png" width={110} style={logoStyle}/>
						<div style={menuStyle}>
							<i className="fa fa-bars" style={iconStyle} aria-hidden="true"></i>
						</div>
					</div>
        );
    }

}

export default HeaderLeft;