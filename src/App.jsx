import React from 'react';
import { Component } from 'react';
import Header from './containers/Header.js';
import Sidebar from './containers/Siderbar';

export class App extends Component {
	render() {

		const appContainer = {
			height:'100%'
		};

		return (
			<div style={appContainer}>
				<Header />
				<Sidebar />
			</div>
		);
	}
}