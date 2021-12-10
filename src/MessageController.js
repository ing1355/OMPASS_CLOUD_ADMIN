import { message } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';
import ActionCreators from './redux/actions';

const MessageController = ({msg}) => {
    const { formatMessage } = useIntl();

    useLayoutEffect(() => {
        if(msg) {
            if(msg.type === 'success') message.success(formatMessage({id: msg.id}))
            else if(msg.type === 'error') message.error(formatMessage({id: msg.id}))
        }
    }, [msg])

    return <></>
}

function mapStateToProps(state) {
    return {
        msg: state.msg
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageController);
