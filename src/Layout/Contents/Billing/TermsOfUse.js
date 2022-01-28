import React, { useCallback } from 'react';
import CustomConfirm from '../../../CustomComponents/CustomConfirm';

const TermsOfUse = ({ visible, setVisible }) => {
    const closeModal = useCallback(() => {
        setVisible(false);
    }, [])
    return <CustomConfirm
    centered
    maskClosable
    width={720}
    style={{ maxHeight: 800, overflow: 'auto', justifyContent: 'start' }}
    visible={visible}
    footer={null}
    cancelCallback={closeModal}
>
        test
    </CustomConfirm>
}

export default TermsOfUse