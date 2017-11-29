import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { App } from './App.jsx';
import Login from './components/login/Login.component';
const app = require('./scss/App.scss');
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger';
import { Provider } from 'react-redux';
import EmployerSignup from './components/employer-signup/EmployerSignup';

const routes = (

	<Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
		<BrowserRouter>
			<Switch>
				<Route
					path="/index"
					exact={true}
					component={App}
				/>
				<Route>
					<Switch>
						<Route
							path="/login"
							component={Login}
						/>
						<Route
							path="/employer-signup"
							component={EmployerSignup}
						/>
					</Switch>
				</Route>
			</Switch>
		</BrowserRouter>
	</Provider>

);

ReactDOM.render(
	routes,
	document.getElementById('app')
);