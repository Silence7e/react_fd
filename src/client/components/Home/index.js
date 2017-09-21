import React, {Component} from 'react';
import CSS from 'react-css-modules';
import styles from './index.scss';
import PropTypes from 'prop-types';
@CSS(styles)
class Home extends Component {
    constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps);
    }
    render() {
        const props = this.props;
        return <div styleName="home-text" onClick={()=>props.getText(props.text || 1)}>{props.text || 'click!'}</div>;
    }
}
Home.propTypes ={
    text: PropTypes.number
};

export default Home;
