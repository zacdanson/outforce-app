import React, { Component } from 'react';


export class UserDashboard extends Component {
    render() {

        const appContainer = {
            height:'100%',
            backgroundColor:'#444444'
        };

        return (
            <div style={appContainer}>
                <h1>User Dashboard</h1>
            </div>
        );
    }
}

export default UserDashboard;