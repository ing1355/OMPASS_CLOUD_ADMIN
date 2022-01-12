import React, { useLayoutEffect } from "react";
import { signUpAdminApi } from "../../Constants/SignUpApi";
import { CustomAxiosPost } from "../../Functions/CustomAxios";
import "./SubAdminSignUp.css";

const AdminSignUp = ({ history, location }) => {
    const token = location ? location.pathname.split("/")[3] : null;

    useLayoutEffect(() => {
        CustomAxiosPost(
            signUpAdminApi,null,
            () => {
                alert(
                    "회원가입이 정상적으로 처리되었습니다."
                );
                history.push('/');
            },
            null,
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }
        );
    },[])

    return <></>
};

export default AdminSignUp