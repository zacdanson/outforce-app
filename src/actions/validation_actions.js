import { loading, handleError } from './helper-actions/helper-actions';

export const checkValid  = (array) => {
	return (dispatch) => {
		let counter = 0;

		_.each(array, valid=>{
			if(valid){
				counter++;
			}
		});
		dispatch(updateFormValid(counter === array.length ));

	};
};

export const updateFormValid = (valid) => {
	return {
		type:'UPDATE_FORM_VALID',
		payload: valid
	}
};