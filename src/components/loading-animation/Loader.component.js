import React, { Component } from 'react';


export default class Loader extends Component {

    constructor(props){
        super(props);
    }

    render() {
        let width;

        if (this.props.size === 'small') {
            width = 50;
        } else {
            width = 85;
        }

        return (
            <div className="loaderContainer">
                <div className="lds-flickr">
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

