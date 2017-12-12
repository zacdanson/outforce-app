export const loading = (status) => {
	return {
		type: 'LOADING',
		payload: status
	};
};

export const handleError = (error) => {
	return {
		type:'ERROR',
		payload: error
	};
};

export const updateUser = (user) => {
	console.log(user);
	return {
		type:'UPDATE_USER',
		payload: user
	};
};


