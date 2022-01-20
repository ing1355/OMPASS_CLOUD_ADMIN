import React, { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { signUpAdminApi } from "../../Constants/SignUpApi";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import "./SubAdminSignUp.css";

const AdminSignUp = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const country = location ? location.pathname.split("/")[3] : null;
    const token = location ? location.pathname.split("/")[5] : null;
    const isKorea = country === 'KR'
    
    useLayoutEffect(() => {
        CustomAxiosPost(
            signUpAdminApi,null,
            () => {
                alert(isKorea ? "회원가입이 정상적으로 처리되었습니다." : 'Your registration has been successfully completed.');
                navigate('/');
            },
            null,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
    },[isKorea, navigate, token])

    return <></>
};

export default AdminSignUp