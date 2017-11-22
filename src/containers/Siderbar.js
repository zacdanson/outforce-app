import React, { Component } from 'react';


class Sidebar extends Component{

    render(){

        const sideBarStyle = {
          backgroundColor:'#161B32',
          width: 200,
          height: '100%',
          minHeight: '100%'
        };

        return(
            <div style={sideBarStyle}>
            </div>
        );

    }
}


export default Sidebar;