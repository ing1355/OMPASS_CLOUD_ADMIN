import React from 'react';
import {Modal} from 'antd';

const CustomConfirm = ({visible, children, confirmCallback, cancelCallback, okLoading}) => {
    return <Modal visible={visible} destroyOnClose closable={false} onOk={confirmCallback} confirmLoading={okLoading} onCancel={cancelCallback} maskClosable={false}>
        {children}
    </Modal>
}

export default CustomConfirm;