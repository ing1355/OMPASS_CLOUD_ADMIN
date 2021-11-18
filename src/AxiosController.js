import { message } from 'antd';
import axios from 'axios';
import React, { useEffect, useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import { useHistory } from 'react-router';
import ActionCreators from './redux/actions';

const AxiosController = ({setIsLogin}) => {
    const { formatMessage } = useIntl();
    const history = useHistory();

    useLayoutEffect(() => {
        axios.interceptors.request.use(req => {
            console.log(req);
            return req;
        }, err => {
            console.log(err);
        })
        axios.interceptors.response.use(res => {
            console.log(res);
            return res;
        }, (err) => {
            const url = err.response.config.url.split('/');
            message.error(formatMessage({ id: err.response.data.code }))
            if(err.response.data.code === 'UNAUTHORIZED' && url[url.length-1] !== 'signup-token') {
                setIsLogin(false);
            }
            console.log(err.response.data);
            // CustomConsoleLog(err);
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
