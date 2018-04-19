import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { selectTab } from '../../actions/main_actions';

@connect((store)=>{
	return {
		selectedTab: store.main.selectedTab,
		sidebar: store.main.sidebar
	}
})

class SideNavItem extends Component {

	constructor(props){
		super(props);
	}

	componentDidMount(){

	}

	switchTab(){
		this.props.dispatch(
			selectTab({name: this.props.name, location: this.props.href})
		);
	}


	render() {

		let vm = this;
		let item = null;
		let toggleSelected = this.props.sidebar === 'max' ? 'side-nav-item selected-side-nav-item sidebar-max' : 'side-nav-item selected-side-nav-item minimised sidebar-min' ;
		let toggleNotSelected = this.props.sidebar === 'max' ? 'side-nav-item sidebar-max' : 'side-nav-item minimised sidebar-min';
		let toggleClassName = this.props.sidebar === 'max' ?  'side-nav-name side-nav-show' : 'side-nav-name side-nav-hide';
		let selectedTab =  this.props.location === this.props.href;
		return (

			<div onClick={this.switchTab.bind(this)}>
				{ this.props.strict === this.props.userRole || !this.props.strict ?
				<NavLink to={this.props.href}>
					<p className={selectedTab ? toggleSelected : toggleNotSelected }>
						<i className={'fa '+this.props.icon } aria-hidden="true" style={{width: 20}}></i><span className={toggleClassName}>{this.props.name}</span>
					</p>
				</NavLink>  : "" }
			</div>
		);

	}

}

export default SideNavItem;
