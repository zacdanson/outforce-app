import React, {Component} from 'react';


class Button extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <div name={this.props.name}
                 className={"btn btn-primary form-control " + this.props.className}
                 id={this.props.name}
                 onClick={this.props.onClick}
            >
                {this.props.text}
            </div>
        );

    }

}

export default Button;