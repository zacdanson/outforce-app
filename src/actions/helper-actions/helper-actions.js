import { loading } from '../main_actions';

export const handleError = (error) => {
	return {
		type:'ERROR',
		payload: error
	};
};

export const updateUser = (user) => {
	return async (dispatch) => {
		console.log(user);
		await dispatch({
			type: 'UPDATE_USER',
			payload: user
		});
		console.log('ere');
		await dispatch(loading(false));
	}
};


export const getUrlParameter = (name) => {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	const results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};