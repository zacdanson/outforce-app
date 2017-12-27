import React, {Component} from 'react';


class Button extends Component {

    constructor(props){
        super(props);
    }

    openModal(){
			$('#'+this.props.modalName).modal('toggle');
		}

    render(){

        return(
            <button
							type="button"
							name={this.props.name}
						  className={"btn " + this.props.className}
						  id={this.props.id}
						  onClick={this.props.openModal ? this.openModal.bind(this) : this.props.onClick}
							disabled={this.props.disabled}
							style={this.props.style}
						>
							{this.props.icon}

              {this.props.text}
							{this.props.children}
            </button>
        );

    }

}

export default Button;