import { loading } from '../main_actions';

export const handleError = (error) => {
	return {
		type:'ERROR',
		payload: error
	};
};

export const getUrlParameter = (name) => {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};