import React, { Component } from 'react';

class Loader extends Component {

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
            <div className={this.props.size === 'small' ? 'loaderContainer loader-container-small' : 'loaderContainer' }>
                <div className={this.props.size === 'small' ? 'lds-flickr small-loader' : 'lds-flickr'}>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Loader;
