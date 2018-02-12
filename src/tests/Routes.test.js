'use strict';
import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router';
import { Provider, connect} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as firebase from 'firebase';
import {
	EmployerContractors,
	EmployerAdmin,
	EmployerDashboard,
	EmployerForecasts,
	EmployerSignup,
	ContractorDashboard,
	ContractorSignup,
	Login,
} from '../components';
import Routers from '../routes';
import Home from '../containers/Home';


describe('Test all Routes' , ()=>{

	const initialState = {
		user: {
			userData: {
				id: 'test id',
				companyId: 'test company id',
				name: 'test name'
			}
		},
		main: {
			loadingAnimation: false,
			sidebar: '',
			loading:false
		},
		contractor: {
			contractors: [],
			formData: '',
			selectedUsers: []
		},
		formData: {
		},
		auth:{
			formData: 'test form data'
		}

	};


	const middlewares = [ ReduxThunk ];
	const mockStore = configureStore(middlewares);
	const store = mockStore(initialState);


	test('<EmployerContractors /> renders at correct route.', () => {

		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/index/employer/employer-contractors']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(EmployerContractors).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(1);


	});


	test('<EmployerForecasts/> renders at correct route.', ()=>{
		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/index/employer/employer-forecasts']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(EmployerForecasts).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(1);

	});



	test('<EmployerAdmin/> renders at correct route.', ()=>{

		const initialState = {
			user: {
				userData: 'test user'
			},
			main: {
				loading: false
			}
		};

		let store = mockStore(initialState);
		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/index/employer/employer-admin']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(EmployerAdmin).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(1);

	});

	test('<EmployerDashboard/> renders at correct route.', ()=>{

		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/index/employer/employer-dashboard']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(EmployerDashboard).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(1);

	});


	test('<EmployerSignup /> renders at correct route.', ()=>{


		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/employer/employer-signup']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(EmployerSignup).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(0);

	});

	test('<ContractorSignup /> renders at correct route.', ()=>{

		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/contractor/contractor-signup/testId/testCid/contractor']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(ContractorSignup).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(0);

	});


	test('<ContractorDashboard /> renders at correct route.', ()=>{

		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/index/contractor/contractor-dashboard']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(ContractorDashboard).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(1);

	});


	test('<Login /> renders at correct route.', ()=>{



		const mockStore = configureStore();

		let store = mockStore(initialState);
		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/login']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Login).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(0);

	});

	test('<Login /> renders at correct if given an incorrect route.', ()=>{

		const mockStore = configureStore();


		let store = mockStore(initialState);
		let wrapper = mount(
			<Provider store={store}>
				<MemoryRouter initialEntries={['/incorrectRoute']} initialIndex={1}>
					<Routers />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(Login).length).toBe(1);
		expect(wrapper.find(Home).length).toBe(0);

	});


});

