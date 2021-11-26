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

const AdminDetail = ({ data, deleteEvent, updateEvent }) => {
  const {
    adminId,
    country,
    email,
    firstName,
    lastName,
    phone,
    role,
    subAdminId,
    index,
  } = data;
  const history = useHistory();
  const [inputMobile, setInputMobile] = useState(phone);
  const [countryCode, setCountryCode] = useState(country);

  const onFinish = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, passwordConfirm } =
      e.target.elements;
    if (password.value || passwordConfirm.value) {
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
    CustomAxiosPut(
      route,
      {
        country: countryCode,
        phone: inputMobile,
        firstName: firstName.value,
        lastName: lastName.value,
        password: password.value ? password.value : null,
      },
      () => {
        updateEvent({
          ...data,
          country: countryCode,
          phone: inputMobile,
          firstName: firstName.value,
          lastName: lastName.value,
        });
        history.push("/Admins");
      }
    );
  };

  const onDelete = () => {
    if (role === "ADMIN") return message.error("관리자는 삭제할 수 없습니다.");
    CustomAxiosDelete(deleteSubAdminApi(adminId, subAdminId), () => {
      deleteEvent(index);
      history.push("/Admins");
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
            <div className="inputBox">
              <span>New password</span>
              <input placeholder="패스워드를 입력하세요." name="password" />
            </div>
            <div className="inputBox">
              <span>Confirm new password</span>
              <input
                placeholder="패스워드를 입력하세요."
                name="passwordConfirm"
              />
            </div>
            <div className="inputBox2">
              <span>Phone</span>
              <div className="phoneBox">
                <PhoneInput
                  className="phoneInput"
                  country={countryCode}
                  value={inputMobile}
                  onChange={(value, countryInfo) => {
                    setInputMobile(value);
                    if (countryCode !== countryInfo.countryCode.toUpperCase())
                      setCountryCode(countryInfo.countryCode.toUpperCase());
                  }}
                  preferredCountries={["kr", "us"]}
                />
              </div>
            </div>
            <Button
              className="adminUpdateButton"
              type="submit"
              onClick={() => {
                message.success("변경되었습니다.");
              }}
            >
              <UserSwitchOutlined /> 변경
            </Button>
            <Popconfirm
              placement="top"
              title={"삭제하시겠습니까"}
              okText="Yes"
              cancelText="No"
              onConfirm={onDelete}
            >
              <Button className="adminUpdateButton" type="button">
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

export default AdminDetail;
