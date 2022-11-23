import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { Button } from "antd";
import { UserSwitchOutlined, UserDeleteOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";
import {
  CustomAxiosDelete,
  CustomAxiosPost,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";
import {
  updateAdminApi,
  updateSubAdminApi,
  deleteSubAdminApi,
  deleteAdminApi,
} from "../../../Constants/Api_Route";
import { isADMINRole } from "../../../Constants/GetRole";
import { connect, useSelector } from "react-redux";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";
import ActionCreators from "../../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";
import { FailToTest, passwordTest } from "../../../Constants/InputRules";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { verifyPasswordApi } from "../../../Constants/VerifyPassword";

const timeZoneStatus = {
  local: 'LOCAL_TIME_ZONE',
  registration: 'CONFIGURED_TIME_ZONE'
}

const AdminDetail = ({
  data,
  deleteEvent,
  updateEvent,
  userProfile,
  showSuccessMessage,
  showErrorMessage,
  setIsLogin,
}) => {
  const {
    country,
    email,
    firstName,
    lastName,
    phone,
    role,
    subAdminId,
    index,
    planStatus,
    timeConverterType
  } = data || {};
  const { adminId } = userProfile;
  const navigate = useNavigate();
  const { formatMessage } = useIntl();
  const isSelf = userProfile.email === email;
  const verifyPasswordRef = useRef(null);
  const [inputCountryCode, setInputCountryCode] = useState(country);
  const [inputFormat, setInputFormat] = useState(null);
  const [inputDialCode, setInputDialCode] = useState(null);
  const [confirmModal, setConfirmModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { standalone } = useSelector(state => ({
    standalone: state.standalone.standalone
  }))

  useLayoutEffect(() => {
    if (phone) {
      setInputDialCode(phone.split(" ")[0].slice(1));
      setInputFormat(phone);
    }
  }, [phone]);

  const openConfirmModal = useCallback(() => {
    if (planStatus === "FAILED_REGULAR_PAYMENT") return showErrorMessage('CANT_WITHDRAWAL_BECAUSE_PAYMENT')
    setConfirmModal(true);
  }, [data]);
  const closeConfirmModal = useCallback(() => {
    setConfirmLoading(false);
    setConfirmModal(false);
  }, []);

  const onFinish = (e) => {
    e.preventDefault();
    const { firstName, lastName, password, passwordConfirm, mobile, timezone } =
      e.target.elements;
    if (isSelf && (password.value || passwordConfirm.value)) {
      if (!passwordTest(password.value))
        return FailToTest(password, showErrorMessage("INCORRECT_PASSWORD"));
      if (password.value !== passwordConfirm.value) {
        return showErrorMessage("NOT_EQUAL_PASSWORD");
      }
    }
    if (!inputFormat) return showErrorMessage('PLEASE_INPUT_MOBILE');
    if (mobile.value.length !== inputFormat.length) return showErrorMessage('PLEASE_COMPLETE_ADMIN_MOBILE')
    if (inputDialCode && !mobile.value.startsWith('+' + inputDialCode)) {
      if (mobile.value.length < inputDialCode.length + 1) return showErrorMessage('NO_DIAL_CODE')
    }

    if (role === "ADMIN" && data.country !== inputCountryCode)
      return showErrorMessage("DIFFERENT_COUNTRY_CODE");
    
    CustomAxiosPut(
      isADMINRole(role)
        ? updateAdminApi(adminId)
        : updateSubAdminApi(adminId, subAdminId),
      {
        country: inputCountryCode,
        phone: mobile.value,
        firstName: firstName.value,
        lastName: lastName.value,
        password: isSelf && password.value ? password.value : null,
        timeConverterType: (standalone || role !== 'ADMIN') ? timeZoneStatus.registration : (timezone[0].checked ? timeZoneStatus.registration : timeZoneStatus.local)
      },
      (updatedData) => {
        updateEvent({
          ...updatedData,
          country: inputCountryCode,
          phone: mobile.value,
          firstName: firstName.value,
          lastName: lastName.value,
          timeConverterType: (standalone || role !== 'ADMIN') ? timeZoneStatus.registration : (timezone[0].checked ? timeZoneStatus.registration : timeZoneStatus.local)
        });
        navigate("/Admins");
      },
      () => {
        showErrorMessage("UPDATE_FAIL");
      }
    );
  };

  const onDelete = () => {
    setConfirmLoading(true);
    const callback = () => {
      setConfirmLoading(true);
      CustomAxiosDelete(
        role === "ADMIN"
          ? deleteAdminApi(adminId)
          : deleteSubAdminApi(adminId, subAdminId),
        () => {
          if (isSelf) {
            setIsLogin(false);
            showSuccessMessage("ADMINDELETESUCCESS");
          } else {
            setConfirmLoading(false);
            deleteEvent(index);
            navigate("/Admins");
          }
        },
        () => {
          setConfirmLoading(false);
          showErrorMessage("DELETE_FAIL");
        }
      );
    }
    if (isSelf && role === 'ADMIN') {
      if (!verifyPasswordRef.current.value.length) {
        verifyPasswordRef.current.focus();
        return showErrorMessage('PLEASE_INPUT_PASSWORD')
      }
      CustomAxiosPost(verifyPasswordApi, {
        email,
        password: verifyPasswordRef.current.value
      }, (data) => {
        callback();
      }, () => {
        setConfirmLoading(false);
      })
    } else {
      callback();
    }
  };

  return (
    <>
      {data && Object.keys(data).length > 0 ? (
        <div className="AdminBox">
          <form className="updateForm" onSubmit={onFinish}>
            <div className="inputBox">
              <span>
                <FormattedMessage id="FIRSTNAME" />
              </span>
              <input
                placeholder={formatMessage({
                  id: "PLEASE_INPUT_FIRST_NAME",
                })}
                maxLength={16}
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
                maxLength={16}
                name="lastName"
                defaultValue={lastName}
              />
            </div>

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
                    maxLength={16}
                    type="password"
                    name="password"
                  />
                </div>
                <div className="inputBox">
                  <span>
                    <FormattedMessage id="PASSWORDCONFIRM" />
                  </span>
                  <input
                    placeholder={formatMessage({ id: "PLEASE_INPUT_PASSWORD" })}
                    maxLength={16}
                    type="password"
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
                  value={phone}
                  jumpCursorToEnd
                  inputProps={{
                    name: "mobile",
                  }}
                  onChange={(value, countryInfo) => {
                    if (inputFormat !== countryInfo.format)
                      setInputFormat(countryInfo.format);
                    if (inputDialCode !== countryInfo.dialCode)
                      setInputDialCode(countryInfo.dialCode);
                    if (
                      inputCountryCode.length &&
                      Object.keys(countryInfo).length > 0
                    ) {
                      if (
                        inputCountryCode !==
                        countryInfo.countryCode.toUpperCase()
                      )
                        setInputCountryCode(
                          countryInfo.countryCode.toUpperCase()
                        );
                    }
                  }}
                  preferredCountries={["kr", "us"]}
                />
              </div>
            </div>
            {isSelf && !standalone && role === 'ADMIN' && <div className="inputBox">
                  <span>
                    <FormattedMessage id="TIMEZONE" />
                  </span>
                  <input
                    type="radio"
                    className="timezone-radio"
                    defaultChecked={timeConverterType === timeZoneStatus.registration}
                    id="timezone1"
                    name="timezone"
                  />
                  <label htmlFor="timezone1" className="timezone-label">
                    <FormattedMessage id="REGISTRATION_LOCATION"/>
                  </label>
                  <input
                    type="radio"
                    className="timezone-radio"
                    defaultChecked={timeConverterType === timeZoneStatus.local}
                    id="timezone2"
                    name="timezone"
                  />
                  <label htmlFor="timezone2" className="timezone-label">
                    <FormattedMessage id="CURRENT_LOCATION"/>
                  </label>
                </div>}
            {(userProfile.role === "ADMIN" || isSelf) && (
              <Button className="adminUpdateButton" htmlType="submit">
                <UserSwitchOutlined /> <FormattedMessage id="SAVE" />
              </Button>
            )}
            {(standalone ? (isSelf ? userProfile.role !== 'ADMIN' : userProfile.role === 'ADMIN') : userProfile.role === 'ADMIN') &&
              <Button
                className="adminUpdateButton"
                htmlType="button"
                onClick={openConfirmModal}
              >
                <UserDeleteOutlined /> {standalone ? <FormattedMessage id="DELETE" /> : (isSelf ? <FormattedMessage id="WITHDRAWAL" />
                  : <FormattedMessage id="DELETE" />)}
              </Button>}

            <CustomConfirm
              visible={confirmModal}
              okLoading={confirmLoading}
              confirmCallback={onDelete}
              cancelCallback={closeConfirmModal}
              className="admin-delete-confirm-container"
            >
              {role === "ADMIN" ? (
                <div className="warning-delete">
                  <p>
                    <FontAwesomeIcon icon={faExclamationCircle} />{" "}
                    <FormattedMessage id="WARNING" />
                  </p>
                  <p style={{ marginBottom: '24px' }}>
                    <FormattedMessage id="ADMINDELETEWARNING" />
                  </p>
                  <input style={{ marginBottom: '24px', textAlign: 'center' }} autoFocus placeholder={formatMessage({ id: 'PLEASE_INPUT_PASSWORD' })} onKeyPress={e => {
                    if (e.key === 'Enter' && !confirmLoading) {
                      onDelete();
                    }
                  }} ref={verifyPasswordRef} type="password" maxLength={16} />
                </div>
              ) : (
                <FormattedMessage id="DELETECONFIRM" />
              )}
            </CustomConfirm>
          </form>
        </div>
      ) : (
        <Navigate to="/Admins" />
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
  return {
    showSuccessMessage: (id) => {
      dispatch(ActionCreators.showSuccessMessage(id));
    },
    showErrorMessage: (id) => {
      dispatch(ActionCreators.showErrorMessage(id));
    },
    setIsLogin: (toggle) => {
      dispatch(ActionCreators.setIsLogin(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDetail);
