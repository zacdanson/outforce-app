import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';


class Tabs extends Component {

	constructor(props){
		super(props);
		this.state = {tabs : this.props.tabs};

	}


	render(){
		return(
			<div className={this.props.horizontal ? 'fluid-container tabs' : 'fluid-container tabs row '}>
				<div className={this.props.horizontal ? 'tabs-menu-container horizontal' : 'tabs-menu-container'}>
					{ this.state.tabs.map(tab=>{
						return(
							<NavLink to={this.props.baseUrl + tab.url} key={tab.name} className="tabs-menu-item" >
									{tab.name}
							</NavLink>
							);
						})
					}
				</div>
				{this.props.children}
			</div>
		);

	}

}

export default Tabs;