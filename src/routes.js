import React, { Component } from 'react';
const app = require('./scss/App.scss');
import {  Route, Switch } from 'react-router-dom';
import { autoRehydrate } from 'redux-persist'
require('../firebase-config');
import Home from './containers/Home.js';

import {
	EmployerSignup,
	EmployerForecasts,
	LogoutUser,
	Loader,
	UserProfile,
	Login
} from './components';

import {
	EmployerDashboard,
	EmployerAdmin,
	EmployerContractors,
	ManageContractor,
	ContractorSignup,
	ContractorDashboard,
	DisabledInvite,
	ContractorInvoices
} from './pages';


const Routes = (props) => {

		return (
					<Switch>
							<Route path="/index/employer/employer-dashboard"
										 exact
										 render={props => <Home><EmployerDashboard {...props}/></Home>}
							/>
							<Route path="/index/contractor/contractor-dashboard"
										 exact
										 render={props => <Home><ContractorDashboard {...props}/></Home>}
							/>
							<Route path="/index/user-profile"
										 render={props => <Home><UserProfile {...props}/></Home>}
							/>
							<Route path="/index/employer/employer-contractors"
										 exact
										 render={props => <Home><EmployerContractors {...props}/></Home>}
							/>
							<Route path="/index/employer/employer-contractors/:id/:tab"
										 exact
										 render={props => <Home><ManageContractor {...props}/></Home>}
							/>
							<Route path="/index/employer/employer-admin"
										 exact
										 render={props => <Home><EmployerAdmin {...props}/></Home>}
							/>
							<Route path="/index/employer/employer-admin/:tab"
										 exact
										 render={props => <Home><EmployerAdmin {...props}/></Home>}
							/>
							<Route path="/index/contractor/contractor-invoices"
										 exact
										 render={props => <Home><ContractorInvoices {...props}/></Home>}
							/>

							<Route path="/login" component={Login}/>
							<Route path="/logout" component={LogoutUser}/>
							<Route path="/contractor/contractor-signup/:id/:cid/:type" component={ContractorSignup}/>
							<Route path="/disabled-invite" exact component={DisabledInvite}/>
							<Route path="/employer/employer-signup" exact component={EmployerSignup}/>

							<Route component={Login} />

						</Switch>
		);
};

export default Routes;