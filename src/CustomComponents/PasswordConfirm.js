import React from 'react';
import CustomConfirm from './CustomConfirm';
import './PasswordConfirm.css'

const PasswordConfirm = ({ visible, setVisible, callback, loading, setLoading }) => {
    const onFinish = e => {
        e.preventDefault();
        const {password} = e.target.elements;
        console.log(password.value)
        if(callback) callback();
        setVisible(false);
    }

    const onCancel = () => {
        setVisible(false);
    }

    return <CustomConfirm closable={false} visible={visible} cancelCallback={() => {
        setVisible(false);
        setLoading(false);
    }} okLoading={loading} footer={null}>
        <div>
            비밀번호 확인
            <form onSubmit={onFinish}>
                <input type="password" name="password" autoFocus/>
                <button type="submit">확인</button>
                <button type="button" onClick={onCancel}>취소</button>
            </form>
        </div>
    </CustomConfirm>
}

export default PasswordConfirm;