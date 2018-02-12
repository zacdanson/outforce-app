import React, { Component } from 'react';
import {
	Input,
	Button
} from '../elements';


export const DisabledInvite = () => {
	return(
		<div className="disabled-invite-container">
				<div className="disabled-invite-content">
					<h4>Invitation Link not Valid. </h4>
					<div style={{marginTop:20}}>
							This means this link has already been used to register.
					</div>
					<Button
						onClick={()=>{ window.location.pathname="/login"}}
						name="login"
						text="login"
						className="btn-success disabled-invite-btn"
					/>
				</div>
		</div>
	);
};