import React from 'react';


const toggleMenu = (dropDownId) => {
	if($('#'+dropDownId).hasClass('open')){
		$('#'+dropDownId).removeClass('open').animate({
			padding:'0',
			display:'none',
			width:'0'
		}, 200);
	} else {
		$('#'+dropDownId).addClass('open').animate({
			padding:'8px 0',
			display:'block',
			width:'200px',
			height:'auto'
		}, 200);

	}
};

export const DropDown = (props) => {

	$(document).on('click', e=>{
		if($('#'+props.menuId).hasClass('open') && e.target.id !== props.dropDownId && e.target.id !== props.iconId && e.target.className !== 'drop-down-item-name' && e.target.className !== 'drop-down-item-icon'){
			toggleMenu(props.menuId);
		}
	});

	return (
		<div className="drop-down-button" id={props.dropDownId} onClick={()=>toggleMenu(props.menuId)}>
			<i className={"fa " + props.dropDownIcon} id={props.iconId}  style={{fontSize: '15px'}}></i>
			<div className="drop-down-container" id={props.menuId}>
				{props.dropDownMenu.map(item=>{
					return (
						<div className="drop-down-item">
							{item.icon ? <i className={'drop-down-item-icon fa ' + item.icon}></i> : ''}
							<div className="drop-down-item-name" onClick={()=>item.onClick(item.name)}>{item.name}</div>
						</div>
					);
				})}
			</div>
		</div>
	);

};
