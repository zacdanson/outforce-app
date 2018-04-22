import React, { Component } from 'react';
import Input from '../elements/Input.component';
import Button from '../elements/Button.component';

export const getImageString = async (props)=>{

	let profile_upload = document.getElementsByName(props.name)[0].files[0];
	let reader = new FileReader();
	let url = reader.readAsDataURL(profile_upload);


	return new Promise((resolve, reject)=>{
		reader.onloadend = (e) => {
			resolve(reader.result);
		};
	});
};

export const getImageFile = (props) =>{

	return document.getElementsByName(props.name)[0].files[0];

};

export const getFileName = (props) => {
	return document.getElementsByName(props.name)[0].files[0].name;
};

export const getFileSize = (props) => {
	return document.getElementsByName(props.name)[0].files[0].size;
};

export const getFileType = (props) => {
	return document.getElementsByName(props.name)[0].files[0].type;
};

export const ImageUploader = (props) =>{
	return(
		<Button text={props.buttonText} className={'btn-secondary ' + props.containerClass} >
			<Input className={"form-control " + props.className} type="file" name={props.name} accept="image/*" onChange={props.onChange} />
		</Button>
	);
};