import React from 'react';
import { connect } from 'react-redux';
import Breadcrumb from '../../Constants/Breadcrumb';
import ActionCreators from '../../redux/actions';

const ContentsTitle = ({menuState}) => {
    return <>
        <Breadcrumb />
        <h1 className="contents-container-title">
            {menuState}
        </h1>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentsTitle);