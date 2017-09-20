import React, { Component } from 'react';

export default class extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const props = this.props;
        return (<div>
                {this.props.children || ''}
        </div>);
    }
}
