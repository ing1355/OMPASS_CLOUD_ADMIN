import axios from 'axios';
import React, { useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import ActionCreators from './redux/actions';

const AxiosController = ({ setIsLogin, showErrorMessage }) => {
    useLayoutEffect(() => {
        axios.interceptors.request.use(req => {
            if (process.env.NODE_ENV !== 'production') console.log(req);
            return req;
        }, err => {
            return Promise.reject(err);
        })
        axios.interceptors.response.use(res => {
            if (process.env.NODE_ENV !== 'production') console.log(res);
            return res;
        }, (err) => {
            const url = err.response.config.url.split('/');
            showErrorMessage(err.response.data.code)
            if (err.response.data.code === 'ERR_001' && url[url.length - 1] !== 'signup-token') {
                setIsLogin(false);
            }
            return Promise.reject(err);
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
        },
        showErrorMessage: (id) => {
            dispatch(ActionCreators.showErrorMessage(id));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AxiosController);
