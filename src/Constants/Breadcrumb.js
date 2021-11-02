import React from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../redux/actions';
import './Breadcrumb.css'

const Breadcrumb = ({menuState}) => {
    return <p className="breadcrumb">
        {menuState}
    </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Breadcrumb);