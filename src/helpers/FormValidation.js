import React from 'react';


export const ValidateInput = (props) => {

	switch(props.type){
		case 'email':
			const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if(props.element.value.match(mailformat)){
				toggleClass(props.element, true);
				return true;
			} else {
				toggleClass(props.element, false);
				return false;
			}
			break;
		case 'password':
			if(props.element.value.length>6){
				toggleClass(props.element, true);
				return true;
			} else {
				toggleClass(props.element, false);
				return false;
			}
			break;
		case 'required':
			if(props.element.value.length>0){
				toggleClass(props.element, true);
				return true;
			} else {
				toggleClass(props.element, false);
				return false;
			}
			break;
	}

};

function toggleClass(element, valid){

	if(valid){
		let checkClass = $(element).hasClass('invalid') ? 'invalid' : '';
		$(element).removeClass(checkClass);
	} else {
		let checkClass = $(element).hasClass('invalid') ? '' : ' invalid';
		element.className += checkClass;
	}
}