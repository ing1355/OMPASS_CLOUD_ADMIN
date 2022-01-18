import React, { useLayoutEffect } from 'react';
import { verifyOMPASSApi } from '../../Constants/OmpassApi';
import { CustomAxiosPost } from '../../Functions/CustomAxios';
import queryString from 'query-string';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actions';
import { useLocation, useNavigate } from 'react-router';

const OMPASSVerify = ({ setIsLogin, setUserProfile }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const query = queryString.parse(location.search);
    const { username, access_token } = query;
    
    useLayoutEffect(() => {
        CustomAxiosPost(verifyOMPASSApi, {
            email: username,
            verifyOmpassToken: access_token
        }, (data, callback) => {
            const {adminId, email, role, country, ompass} = data;
            if(callback) callback();
            setUserProfile({
                adminId,
                email,
                role,
                country,
                ompass
            })
            setIsLogin(true);
            navigate('/');
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