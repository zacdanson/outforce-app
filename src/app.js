import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch, Router } from 'react-router-dom';
import reduxReset from 'redux-reset'
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage';
import Login from './components/login/Login.component';
const app = require('./scss/App.scss');
import { checkAuth } from './actions/auth-actions/login_actions';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import Loader from './components/loading-animation/Loader.component';
import EmployerSignup from './components/employer-signup/EmployerSignup.component';
import EmployerContractors from './components/employer-contractors/EmployerContractors.component';
import UserDashboard from './components/user-dashboard/User.dashboard.component';
import { LogoutUser } from './components/logout-user/LogoutUser.component';
import UserProfile from './components/user-profile/UserProfile.component';
import createBrowserHistory from 'history/createBrowserHistory';
import Home from './components/index';
import { connect } from 'react-redux';
require('../firebase-config');
const uuid = require('uuid4');

///////////////////////////////////////////////

const config = {
	key: 'root',
	storage,
};

const enhancer = compose(
	applyMiddleware(ReduxThunk),
	reduxReset()
);

let reducer = persistCombineReducers(config, reducers);

let store = createStore(reducer, {}, enhancer);

let persistor = persistStore(store, storage);


@connect((store)=>{
	return {
		user: store.user.userData,
		loading: store.user.loading,
		formData: store.auth.formData
	}
})


class App extends Component{

	constructor(props){
		super(props);
	}

	componentDidMount(){

		this.props.dispatch(checkAuth(this.props));
	}

	render(){
		return (
			<BrowserRouter>
				<div>
					<div className="home-container">
						<Route path="/index/" component={Home}/>
						<Route path="/index/user-dashboard" component={UserDashboard}/>
						<Route path="/index/user-profile" component={UserProfile}/>
						<Route path="/index/employer-contractors" component={EmployerContractors} />
						<Route path="/login" exact={true} component={Login} />
						<Route path="/logout" exact={true} component={LogoutUser} />
						<Route path="/employer-signup" exact={true} component={EmployerSignup} />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}

const routes = (

	<Provider store={store}>
			<PersistGate
				loading={<Loader />}
				persistor={persistor}>
				<App />
			</PersistGate>
	</Provider>
);

ReactDOM.render(
	routes,
	document.getElementById('app')
);