import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


ReactDOM.render(
	<MuiThemeProvider>
		<App name="Goodness kayode" />
	</MuiThemeProvider>,
	document.getElementById('app')
);