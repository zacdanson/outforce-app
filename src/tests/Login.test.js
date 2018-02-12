'use strict';
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import { MemoryRouter } from 'react-router';
import ReduxThunk from 'redux-thunk';
const MockFirebase = require('firebase-mock').MockFirebase;
import * as firebase from 'firebase';
import { checkAuth } from '../actions/auth-actions/auth_actions';

import {

	Login,
} from '../components';

import configureStore from 'redux-mock-store';

describe('Test <Login/> logs users in correctly.', ()=>{

	const initialState = {

			auth: {
				formData: {
					email:{
						value: 'dansonzac@gmai.com'
					},
					password: {
						value: 'correct'
					}
				},
				error: {},
				formValid: true,
			},
			user:{
				userData: {
					id:'testId',
					name: 'test',
					email: 'test@gmail.com'
				}
			},
			main:{
				loading: false

			}
	};

	const middlewares = [ ReduxThunk ];
	const mockStore = configureStore(middlewares);
	const store = mockStore(initialState);


	test('login is being called', () =>{

		jest.spyOn(firebase.auth(), 'signInWithEmailAndPassword').mockImplementation((email, password) => {
			if(password === 'correct') {
				return Promise.resolve({user: {id: 'test', name: 'testname'}})
			} else {
				return Promise.reject({error: 'someError'})
			}

		});

		let wrapper = shallow(<Login store={store}/>);

		const instance = wrapper.dive().instance();
		instance.handleLogin();


		expect(firebase.auth().signInWithEmailAndPassword).toBeCalled();

	});


});