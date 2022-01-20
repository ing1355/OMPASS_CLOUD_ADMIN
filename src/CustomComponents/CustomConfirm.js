import React from "react";
import { Modal } from "antd";
import "./CustomConfirm.css";
import CustomButton from "./CustomButton";

const CustomConfirm = ({
  visible,
  children,
  confirmCallback,
  maskClosable,
  cancelCallback,
  okLoading,
  footer,
  centered,
  closable,
  style,
  className,
}) => {
  return (
    <Modal
      visible={visible}
      closable={closable || false}
      onOk={confirmCallback}
      confirmLoading={okLoading}
      onCancel={cancelCallback}
      okButtonProps={{ id: "" }}
      centered={centered}
      footer={null}
      maskClosable={maskClosable || false}
      destroyOnClose
      className={className}
    >
      <div className={"custom-modal-content-container"} style={{ ...style }}>
        {children}
      </div>
      {footer !== null && footer !== false && (
        <div className="custom-modal-button-container">
          <CustomButton
            onClick={() => {
              if (cancelCallback) cancelCallback();
            }}
          >
            Cancel
          </CustomButton>
          <CustomButton
            loading={okLoading}
            disabled={okLoading}
            onClick={() => {
              if (confirmCallback) confirmCallback();
            }}
          >
            OK
          </CustomButton>
        </div>
      )}
    </Modal>
  );
};

export default CustomConfirm;
