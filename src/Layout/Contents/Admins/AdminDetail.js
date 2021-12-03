import React, { useState } from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Popconfirm, message, Button } from "antd";
import { UserSwitchOutlined, UserDeleteOutlined } from "@ant-design/icons";

import { Redirect, useHistory } from "react-router-dom";
import {
  CustomAxiosDelete,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";
import {
  updateAdminApi,
  deleteAdminApi,
  updateSubAdminApi,
  deleteSubAdminApi,
} from "../../../Constants/Api_Route";
import { isADMINRole } from "../../../Constants/GetRole";
import { connect } from "react-redux";

const AdminDetail = ({ data, deleteEvent, updateEvent, userProfile }) => {
  const {
    adminId,
    country,
    email,
    firstName,
    lastName,
    phone,
    role,
    countryCode,
    subAdminId,
    index,
  } = data;
  const history = useHistory();
  const isSelf = userProfile.email === email;
  const [inputMobile, setInputMobile] = useState(countryCode + phone);
  const [inputCountryCode, setInputCountryCode] = useState(country);
  const [inputDialCode, setInputDialCode] = useState(countryCode);

  const onFinish = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, passwordConfirm } =
      e.target.elements;
    if (isSelf && (password.value || passwordConfirm.value)) {
      if (password.value !== passwordConfirm.value) {
        return message.error("비밀번호가 일치하지 않습니다.");
      }
    }
    var route;
    if (isADMINRole(role)) {
      route = updateAdminApi(adminId);
    } else {
      route = updateSubAdminApi(adminId, subAdminId);
    }
    console.log(inputMobile, inputDialCode, inputCountryCode)
    CustomAxiosPut(
      route,
      {
        country: inputCountryCode,
        phone: inputMobile.slice(inputDialCode.length,),
        firstName: firstName.value,
        lastName: lastName.value,
        password: (isSelf && password.value) ? password.value : null,
      },
      () => {
        message.success('수정되었습니다.')
        updateEvent({
          ...data,
          country: inputCountryCode,
          phone: inputMobile.slice(inputDialCode.length,),
          firstName: firstName.value,
          lastName: lastName.value,
        });
        history.push("/Admins");
      }, () => {
        message.error('수정 실패하였습니다.')
      }
    );
  };

  const onDelete = () => {
    if (role === "ADMIN") return message.error("관리자는 삭제할 수 없습니다.");
    CustomAxiosDelete(deleteSubAdminApi(adminId, subAdminId), () => {
      message.success('삭제 성공하였습니다.')
      deleteEvent(index);
      history.push("/Admins");
    }, () => {
      message.error('삭제 실패하였습니다.')
    });
  };

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <div className="AdminBox">
          <form className="updateForm" onSubmit={onFinish}>
            <div className="inputBox">
              <span>First Name</span>
              <input
                placeholder="이름을 입력하세요."
                name="firstName"
                defaultValue={firstName}
              />
            </div>
            <div className="inputBox">
              <span>Last Name</span>
              <input
                placeholder="이름을 입력하세요."
                name="lastName"
                defaultValue={lastName}
              />
            </div>
            <div className="inputBox">
              <span>Email address</span>
              <p className="updateInfo">{email}</p>
            </div>
            {isSelf && <><div className="inputBox">
              <span>New password</span>
              <input placeholder="패스워드를 입력하세요." name="password" />
            </div>
            <div className="inputBox">
              <span>Confirm new password</span>
              <input
                placeholder="패스워드를 입력하세요."
                name="passwordConfirm"
              />
            </div></>}
            <div className="inputBox2">
              <span>Phone</span>
              <div className="phoneBox">
                <PhoneInput
                  className="phoneInput"
                  country={inputCountryCode}
                  value={inputMobile}
                  onChange={(value, countryInfo) => {
                    setInputMobile(value);
                    if (inputCountryCode !== countryInfo.countryCode.toUpperCase()) setInputCountryCode(countryInfo.countryCode.toUpperCase());
                    if (inputDialCode !== countryInfo.dialCode) setInputDialCode(countryInfo.dialCode);
                  }}
                  preferredCountries={["kr", "us"]}
                />
              </div>
            </div>
            <Button
              className="adminUpdateButton"
              htmlType="submit"
            >
              <UserSwitchOutlined /> 수정
            </Button>
            <Popconfirm
              placement="top"
              title={"삭제하시겠습니까"}
              okText="Yes"
              cancelText="No"
              onConfirm={onDelete}
            >
              <Button className="adminUpdateButton" htmlType="button" onClick={onDelete}>
                <UserDeleteOutlined /> 삭제
              </Button>
            </Popconfirm>

            {/* <button
              className="adminUpdateButton"
              type="button"
              onClick={onDelete}
            >
              삭제
            </button> */}
          </form>
        </div>
      ) : (
        <Redirect to="/Admins" />
      )}
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail);
