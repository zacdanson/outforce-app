import React, {Component} from 'react';


class Input extends Component {

    constructor(props){
        super(props);
    }

    render(){

        return(
            <div className="input-container">
                <input
                    className={"form-control " + this.props.className }
                    name={this.props.name}
                    id={this.props.name}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    placeholder={this.props.placeholder}
                    type={this.props.type}
                    accept={this.props.accept}
										defaultValue={this.props.defaultValue}
								/>

            </div>
        );

    }

}

export default Input;