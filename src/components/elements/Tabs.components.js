import React, {Component} from 'react';



class Tabs extends Component {

	constructor(props){
		super(props);
		this.state = {tabs : this.props.tabs};

	}

	changeTab(key){
		let tabs = this.state.tabs;
		tabs.map(tab=>{
			tab.name === key ? tab.active = true : tab.active = false;
		});
		this.setState({ tabs });
	}

	render(){
		return(
			<div className={this.props.horizontal ? 'fluid-container tabs' : 'fluid-container tabs row '}>
				<div className={this.props.horizontal ? 'tabs-menu-container horizontal' : 'tabs-menu-container'}>
					{ this.state.tabs.map(tab=>{
						return(
								<div key={tab.name}
										 className={tab.active ? 'tabs-menu-item active' : 'tabs-menu-item'}
										 onClick={()=>this.changeTab(tab.name)}>{tab.name}
							  </div>
							);
						})
					}
				</div>
				<div className="col">
					{ this.props.children.map((component, index )=>{
							return (
								this.state.tabs[index].active ? component : ''
							)
						})
					}
				</div>
			</div>
		);

	}

}

export default Tabs;