import React from 'react';



const Card = (props) => {

	return (
		<div className={'o-card-container ' + props.className} style={props.style}>
			{ props.noHeader ? '' : <div className="o-card-header">
				<div className="o-card-header-caption"><i className={"fa "+props.headerIcon} style={{marginRight:8, fontSize:'1.5rem'}}></i>  {props.cardHeader}</div>
				<div className="o-card-header-tools">{
					props.headerTools ?
					props.headerTools.map((tool, index)=>{
						return(tool);
					}) : ''
				}</div>
			</div> }
			<div className={"o-card-content " + props.contentClass}>
				{props.children}
			</div>
		</div>
	);

};


export default Card;