import React, { Component } from 'react';
const app = require('./scss/App.scss');
import { checkAuth } from './actions/auth-actions/auth_actions';
import { loading } from './actions/main_actions';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect} from 'react-redux';
import reduxReset from 'redux-reset'
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage';
const uuid = require('uuid4');
import Routes from './routes';
import {   BrowserRouter as Router, Route, Switch } from 'react-router-dom';
const generateData = require('./generateData.js');


@connect((store)=>{
	return {
		user: store.firebaseData.userData,
		loading: store.main.loading,
		formData: store.auth.formData
	}
})



class App extends Component{

	constructor(props){
		super(props);
	}

	componentWillMount(){
		this.props.dispatch(loading(true));
		this.props.dispatch(checkAuth(this.props));
	}

	componentDidMount(){


	}

	render() {
		return (
			<Router history={history}>
				<Routes />
			</Router>
		);
	};
}


export default App;