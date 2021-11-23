import React from 'react';
import { Modal } from 'antd';
import './CustomConfirm.css';

const CustomConfirm = ({ visible, children, confirmCallback, cancelCallback, okLoading, footer}) => {
    return <Modal visible={visible} destroyOnClose closable={true} onOk={confirmCallback} confirmLoading={okLoading} onCancel={cancelCallback} maskClosable={false}
        okButtonProps={{ id: '' }} footer={null}>
        {children}
        {footer && <div className="custom-modal-button-container">
            <button onClick={() => {
                if (cancelCallback) cancelCallback();
            }}>Cancel</button>
            <button disabled={okLoading} onClick={() => {
                if (confirmCallback) confirmCallback();
            }}>OK</button>
        </div>}
    </Modal>
}

export default CustomConfirm;