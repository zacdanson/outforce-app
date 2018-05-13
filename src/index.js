import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App  from './app';
import reducers from './reducers';
import { compose, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider, connect} from 'react-redux';
import reduxReset from 'redux-reset'
import { autoRehydrate, persistStore, persistCombineReducers } from 'redux-persist'
import { PersistGate } from 'redux-persist/es/integration/react'
import storage from 'redux-persist/es/storage';

import {
	Loader
} from './components';

require('../firebase-config');


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


ReactDOM.render(
	<Provider store={store}>
		<PersistGate
			loading={<Loader />}
			persistor={persistor}>
					<App />
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);