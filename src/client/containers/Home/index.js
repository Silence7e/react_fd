import { connect } from 'react-redux';
import Home from 'components/Home';
import {APP_API_REQUEST} from 'client/actions/app';
import home from 'client/api/home';

const mapStateToProps = (state) => {
    return {text: state.home.text.text}
};

const dispatchers = (dispatch) => {
    return {
        getText: (times) => {
            dispatch(APP_API_REQUEST({name: 'getText', func: home.getText, args: [{times}]}));
        }
    }
};

export default connect(
    mapStateToProps,
    dispatchers
)(Home);
