import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import Breadcrumb from '../../Constants/Breadcrumb';
import ActionCreators from '../../redux/actions';

const ContentsTitle = ({title}) => {
    return <>
        <Breadcrumb />
        <h1 className="contents-container-title">
            {title}
        </h1>
    </>
}

function mapStateToProps(state) {
    return {
        
    }
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentsTitle);