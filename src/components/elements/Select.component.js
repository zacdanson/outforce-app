import React, {Component} from 'react';



const Select = (props) => {
	console.log(props);
		return(
			<div className="select-container">
				<select
					className={"form-control input-select " + props.className }
					name={props.name}
					id={props.name}
					onChange={props.onChange}
				>
					{ props.options ? props.options.map((option, index)=>{

						return(
							<option key={index} value={option[props.optionKey]} selected={option[props.selected]}>{option[props.optionName]}</option>
						);
					}) : '' }
				</select>
			</div>
		);
};

export default Select;