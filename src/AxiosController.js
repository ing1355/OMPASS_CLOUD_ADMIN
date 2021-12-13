import { message } from 'antd';
import axios from 'axios';
import React, { useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { loginApi, resetPasswordApi, resetPasswordVerifyApi, signUpAdminApi, verifyOMPASSApi, verifyPasswordApi } from './Constants/Api_Route';
import ActionCreators from './redux/actions';

const AxiosController = ({setIsLogin}) => {
    const { formatMessage } = useIntl();

    useLayoutEffect(() => {
        axios.interceptors.request.use(req => {
            if(process.env.NODE_ENV !== 'production') console.log(req);
            const non_authorization_apis = [loginApi, resetPasswordApi, resetPasswordVerifyApi, verifyOMPASSApi, verifyPasswordApi, signUpAdminApi];
            if(!(non_authorization_apis.includes(req.url) || req.url.includes('/sub-admins/signup-token'))) req.headers.Authorization = localStorage.getItem('Authorization');
            return req;
        }, err => {
            console.log(err);
        })
        axios.interceptors.response.use(res => {
            if(process.env.NODE_ENV !== 'production') console.log(res);
            return res;
        }, (err) => {
            const url = err.response.config.url.split('/');
            message.error(formatMessage({ id: err.response.data.code }))
            if(err.response.data.code === 'ERR_001' && url[url.length-1] !== 'signup-token') {
                setIsLogin(false);
            }
            console.log(err.response.data);
        })
    }, [])

    return <></>
}

function mapStateToProps(state) {
    return {
        lang: state.locale
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setIsLogin: (toggle) => {
            dispatch(ActionCreators.setIsLogin(toggle));
          }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AxiosController);
