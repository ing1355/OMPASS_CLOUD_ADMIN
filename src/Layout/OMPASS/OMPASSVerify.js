import React, { useLayoutEffect } from 'react';
import { verifyOMPASSApi } from '../../Constants/Api_Route';
import { CustomAxiosPost } from '../../Functions/CustomAxios';
import queryString from 'query-string';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actions';

const OMPASSVerify = ({ history, location, setIsLogin, setUserProfile }) => {
    const query = queryString.parse(location.search);
    const { isRegisterSuccess, username, access_token, key } = query;
    
    useLayoutEffect(() => {
        CustomAxiosPost(verifyOMPASSApi, {
            email: username,
            verifyOmpassToken: access_token
        }, (data, callback) => {
            const {adminId, email, role, country, ompass} = data;
            setUserProfile({
                adminId,
                email,
                role,
                country,
                ompass
            })
            setIsLogin(true);
            history.push('/');
            if(callback) callback();
        })
    }, [])
    return <div />
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLogin: (toggle) => {
            dispatch(ActionCreators.setIsLogin(toggle));
        },
        setUserProfile: (data) => {
            dispatch(ActionCreators.setProfile(data));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OMPASSVerify);