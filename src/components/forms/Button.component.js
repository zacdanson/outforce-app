import React, {Component} from 'react';


class Button extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <button
							name={this.props.name}
						  className={"btn form-control " + this.props.className}
						  id={this.props.id}
						  onClick={this.props.onClick}
							disabled={this.props.disabled}
						>
              {this.props.text}
							{this.props.children}
            </button>
        );

    }

}

export default Button;