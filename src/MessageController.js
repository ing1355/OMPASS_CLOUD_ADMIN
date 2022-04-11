import { message } from 'antd';
import React, { useLayoutEffect } from 'react';
import { useIntl } from 'react-intl';
import { connect } from 'react-redux';

const MessageController = ({msg}) => {
    const { formatMessage } = useIntl();

    useLayoutEffect(() => {
        if(msg) {
            if(msg.id) {
                if(msg.type === 'success') message.success(formatMessage({id: msg.id}))
                else if(msg.type === 'error') {
                    if(msg.param) {
                        if(typeof msg.param === 'object') message.error(formatMessage({id: msg.id}, { ...msg.param }))
                        else message.error(formatMessage({id: msg.id}, { param: msg.param }))
                    }
                    else message.error(formatMessage({id: msg.id}))
                }
            } else {
                if(msg.type === 'error') {
                    message.error('Fail to Connect!')
                }
            }
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
