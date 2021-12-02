import React from 'react';
import { Modal } from 'antd';
import './CustomConfirm.css';
import CustomButton from './CustomButton';

const CustomConfirm = ({ visible, children, confirmCallback, closable, cancelCallback, okLoading, footer, centered}) => {
    return <Modal visible={visible} destroyOnClose closable={closable} onOk={confirmCallback} confirmLoading={okLoading} onCancel={cancelCallback} maskClosable={false}
        okButtonProps={{ id: '' }} centered={centered} footer={null}>
        {children}
        {footer && <div className="custom-modal-button-container">
            <CustomButton onClick={() => {
                if (cancelCallback) cancelCallback();
            }}>Cancel</CustomButton>
            <CustomButton loading={okLoading} disabled={okLoading} onClick={() => {
                if (confirmCallback) confirmCallback();
            }}>OK</CustomButton>
        </div>}
    </Modal>
}

export default CustomConfirm;