import React, { useCallback, useState } from "react";
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
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import ActionCreators from "../../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";

const AdminDetail = ({
  locale,
  data,
  deleteEvent,
  updateEvent,
  userProfile,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const {
    adminId,
    country,
    email,
    firstName,
    lastName,
    phone,
    role,
    dialCode,
    subAdminId,
    index,
  } = data;
  const history = useHistory();
  const { formatMessage } = useIntl();
  const isSelf = userProfile.email === email;
  const [inputMobile, setInputMobile] = useState(dialCode + phone);
  const [inputCountryCode, setInputCountryCode] = useState(country);
  const [inputDialCode, setInputDialCode] = useState(dialCode);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const openConfirmModal = useCallback(() => {
    setConfirmModal(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setConfirmModal(false);
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, passwordConfirm } =
      e.target.elements;
    if (isSelf && (password.value || passwordConfirm.value)) {
      if (password.value !== passwordConfirm.value) {
        return showErrorMessage("NOT_EQUAL_PASSWORD");
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
        country: inputCountryCode,
        phone: inputMobile.slice(inputDialCode.length),
        firstName: firstName.value,
        lastName: lastName.value,
        password: isSelf && password.value ? password.value : null,
      },
      (updatedData) => {
        showSuccessMessage("UPDATE_SUCCESS");
        updateEvent({
          ...updatedData,
          country: inputCountryCode,
          phone: inputMobile.slice(inputDialCode.length),
          firstName: firstName.value,
          lastName: lastName.value,
        });
        history.push("/Admins");
      },
      () => {
        showErrorMessage("UPDATE_FAIL");
      }
    );
  };

  const onDelete = () => {
    if (role === "ADMIN") return showErrorMessage("ADMIN_CANT_DELETE");
    setConfirmLoading(true);
    CustomAxiosDelete(
      deleteSubAdminApi(adminId, subAdminId),
      () => {
        setConfirmLoading(false);
        showSuccessMessage("DELETE_SUCCESS");
        deleteEvent(index);
        history.push("/Admins");
      },
      () => {
        setConfirmLoading(false);
        showErrorMessage("DELETE_FAIL");
      }
    );
  };

  return (
    <>
      {Object.keys(data).length > 0 ? (
        <div className="AdminBox">
          <form className="updateForm" onSubmit={onFinish}>
            {locale === "ko" ? (
              <>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="FIRSTNAME" />
                  </span>
                  <input
                    placeholder={formatMessage({
                      id: "PLEASE_INPUT_FIRST_NAME",
                    })}
                    name="firstName"
                    defaultValue={firstName}
                  />
                </div>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="LASTNAME" />
                  </span>
                  <input
                    placeholder={formatMessage({ id: "PLEASE_INPUT_NAME" })}
                    name="lastName"
                    defaultValue={lastName}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="FIRSTNAME" />
                  </span>
                  <input
                    placeholder={formatMessage({
                      id: "PLEASE_INPUT_FIRST_NAME",
                    })}
                    name="lastName"
                    defaultValue={firstName}
                  />
                </div>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="LASTNAME" />
                  </span>
                  <input
                    placeholder={formatMessage({ id: "PLEASE_INPUT_NAME" })}
                    name="firstName"
                    defaultValue={lastName}
                  />
                </div>
              </>
            )}

            <div className="inputBox">
              <span>
                <FormattedMessage id="EMAIL" />
              </span>
              <p className="updateInfo">{email}</p>
            </div>
            {isSelf && (
              <>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="PASSWORD" />
                  </span>
                  <input
                    placeholder={formatMessage({ id: "PLEASE_INPUT_PASSWORD" })}
                    name="password"
                  />
                </div>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="PASSWORDCONFIRM" />
                  </span>
                  <input
                    placeholder={formatMessage({ id: "PLEASE_INPUT_PASSWORD" })}
                    name="passwordConfirm"
                  />
                </div>
              </>
            )}
            <div className="inputBox2">
              <span>
                <FormattedMessage id="MOBILE" />
              </span>
              <div className="phoneBox">
                <PhoneInput
                  className="phoneInput"
                  country={inputCountryCode}
                  value={inputMobile}
                  onChange={(value, countryInfo) => {
                    setInputMobile(value);
                    console.log(countryInfo, inputDialCode)
                    if(inputCountryCode.length) {
                      if (inputCountryCode !== countryInfo.countryCode.toUpperCase())
                        setInputCountryCode(
                          countryInfo.countryCode.toUpperCase()
                        );
                    }
                    if (inputDialCode !== countryInfo.dialCode)
                      setInputDialCode(countryInfo.dialCode);
                  }}
                  preferredCountries={["kr", "us"]}
                />
              </div>
            </div>
            <Button className="adminUpdateButton" htmlType="submit">
              <UserSwitchOutlined /> <FormattedMessage id="UPDATE" />
            </Button>
            {role !== 'ADMIN' && !isSelf && <Button
              className="adminUpdateButton"
              htmlType="button"
              onClick={openConfirmModal}
            >
              <UserDeleteOutlined /> <FormattedMessage id="DELETE"/>
            </Button>}

            <CustomConfirm
              visible={confirmModal}
              okLoading={confirmLoading}
              confirmCallback={onDelete}
              cancelCallback={closeConfirmModal}
            >
              <FormattedMessage id="DELETECONFIRM" />
            </CustomConfirm>
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
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail);
