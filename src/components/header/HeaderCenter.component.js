import React, {Component} from 'react';
import { connect } from 'react-redux';


@connect(store=>{
	return{
		selectedTab: store.main.selectedTab
	}
})

class HeaderCenter extends Component{

	handleSidebar(){
		if(this.props.sidebar === 'max'){
			this.props.dispatch(handleSidebar('min'));
		} else {
			this.props.dispatch(handleSidebar('max'));
		}
	}


	render(){
		return(
			<div className="headerCenterStyle">
				<h4 className="headerSelectedTab">{this.props.selectedTab ? this.props.selectedTab.name : '' }</h4>
			</div>
		);
	}

}

export default HeaderCenter;