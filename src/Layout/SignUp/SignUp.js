import { message } from 'antd';
import React, { useLayoutEffect } from 'react';
import { signUpAdminApi } from '../../Constants/Api_Route';
import { CustomAxiosPost } from '../../Functions/CustomAxios';

const SignUp = (props) => {
    const token = props.location.pathname.split('/')[5];
    
    useLayoutEffect(() => {
        console.log(token)
    }, [])

    const onFinish = e => {
        e.preventDefault();
        const {password, passwordConfirm} = e.target.elements
        if(password.value !== passwordConfirm.value) return message.error('비밀번호가 일치하지 않습니다.')
        CustomAxiosPost(signUpAdminApi(localStorage.getItem('adminId')),{
            password: password.value
        },() => {
            alert('이제 변경한 비밀번호를 이용하여 해당 Admin 계정으로 로그인하실 수 있습니다.')
            window.close();
        },null,{
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
    }
    return <>
        <form onSubmit={onFinish}>
            <input name="password"/>
            <input name="passwordConfirm"/>
            <button type="submit">
                비밀번호 변경
            </button>
        </form>
    </>
}

export default SignUp