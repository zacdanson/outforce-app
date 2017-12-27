import React, { Component } from 'react';
import ReactDOM from 'react-dom';
const app = require('./scss/App.scss');
import { checkAuth } from './actions/auth-actions/auth_actions';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect} from 'react-redux';
import {   BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import reduxReset from 'redux-reset'
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage';
const uuid = require('uuid4');
require('../firebase-config');
import Header from './containers/Header.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Home from './containers/Home.js';
import Sidebar from './containers/Sidebar.js';
import {
    EmployerSignup,
    EmployerContractors,
    EmployerDashboard,
		ContractorDashboard,
		ContractorSignup,
		DisabledInvite,
		ManageContractor,
    LogoutUser,
    Loader,
    UserProfile,
    Login,
} from './components';
import {
	loading
} from
	'./actions/main_actions';



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
		console.log(this.props);

	}

	render(){
		return (
			<Router history={history}>
				{ this.props.loading ? <Loader/> :
				<div className="wrapper">
					<Switch>

						<Route path="/index/employer/employer-dashboard"
									 exact
									 render={props=><Home><EmployerDashboard {...props}/></Home>}
						/>
						<Route path="/index/contractor/contractor-dashboard"
									 exact
									 render={props=><Home><ContractorDashboard {...props}/></Home>}
						/>
						<Route path="/index/user-profile"
									 render={props=><Home><UserProfile {...props}/></Home>}
						/>
						<Route path="/index/employer/employer-contractors"
									 exact
									 render={props=><Home><EmployerContractors {...props}/></Home>}
						/>
						<Route path="/index/employer/employer-contractors/:id"
									 exact
									 render={props=><Home><ManageContractor {...props}/></Home>}
						/>

						<Route path="/login" component={Login} />
						<Route path="/logout" component={LogoutUser} />
						<Route path="/contractor/contractor-signup" component={ContractorSignup} />
						<Route path="/disabled-invite" exact component={DisabledInvite} />
						<Route path="/employer/employer-signup" exact component={EmployerSignup} />

					</Switch>
				</div> }
			</Router>
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