import React, {Component} from 'react';
import CSS from 'react-css-modules';
import styles from './index.scss';

@CSS(styles)
export default class extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    render() {
        const props = this.props;
        let num = Number(props.text)||1;
        return <div styleName="home-text" onClick={()=>props.getText(props.text)}>{props.text || 'click!'}</div>;
    }
}
