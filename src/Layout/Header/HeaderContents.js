import React from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actions';
import './HeaderContents.css';
import Locale from './Locale';

const HeaderContents = ({ menuState }) => {
    return (
        <div className="header-contents">
            <div className="header-contents-route-title">{menuState}</div>
            <Locale/>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        menuState: state.menuState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuChange: toggle => {
            dispatch(ActionCreators.menuStateChange(toggle));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContents);