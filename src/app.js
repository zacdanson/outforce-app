import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const app = require('./scss/App.scss');
import { checkAuth } from './actions/auth-actions/login_actions';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import reduxReset from 'redux-reset'
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage';
const uuid = require('uuid4');
require('../firebase-config');

import Home from './containers/Home.js';
import {
    EmployerSignup,
    EmployerContractors,
    UserDashboard,
    LogoutUser,
    Loader,
    UserProfile,
    Login,

} from './components';


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