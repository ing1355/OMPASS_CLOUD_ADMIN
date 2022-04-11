import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  checkApplicationExistenceApi,
  getApplicationDetailApi,
  getNewSecretKeyApi,
  updateApplicationApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
  CustomAxiosPut,
} from "../../../Functions/CustomAxios";

import { CopyOutlined } from "@ant-design/icons";

import "./Applications.css";

import { Button, Space } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";
import CustomButton from "../../../CustomComponents/CustomButton";
import {
  doaminTest,
  FailToTest,
  nameTest,
} from "../../../Constants/InputRules";
import ActionCreators from "../../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";
import CustomConfirm from "../../../CustomComponents/CustomConfirm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const ApplicationDetail = ({
  userProfile,
  tableDataUpdate,
  globalPolicy,
  customPolicies,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const navigate = useNavigate();
  const { appId } = useParams();
  const { adminId } = userProfile;
  const nameRef = useRef(null);
  const doaminRef = useRef(null);
  const redirectURIRef = useRef(null);
  // const statusRef = useRef(null);
  // const statusRef2 = useRef(null);
  const secretKeyRef = useRef(null);
  const policyRef = useRef(null);
  const { formatMessage } = useIntl();
  const [resetLoading, setResetLoading] = useState(false);
  const [isExistCheck, setIsExistCheck] = useState(true);
  const [resetVisible, setResetVisible] = useState(false);
  const [uiUpdate, setUiUpdate] = useState(false);

  const openResetModal = useCallback(() => {
    setResetVisible(true);
  }, []);

  const closeResetModal = useCallback(() => {
    setResetVisible(false);
  }, []);

  useLayoutEffect(() => {
    if (uiUpdate) setUiUpdate(false);
  }, [uiUpdate]);

  useLayoutEffect(() => {
    if (adminId && appId) {
      CustomAxiosGet(getApplicationDetailApi(adminId, appId), (data) => {
        const {
          name,
          secretKey,
          domain,
          redirectUri,
          // status,
          policyId,
        } = data;
        nameRef.current.value = name;
        doaminRef.current.value = domain;
        redirectURIRef.current.value = redirectUri.replace(domain, "");
        secretKeyRef.current.value = secretKey;
        policyRef.current.value = policyId;
        setUiUpdate(true);
      });
    }
  }, [adminId, appId]);

  const resetSecretKey = () => {
    setResetLoading(true);
    CustomAxiosPatch(
      getNewSecretKeyApi(adminId, appId),
      null,
      (data) => {
        secretKeyRef.current.value = data.secretKey;
        setResetLoading(false);
        setResetVisible(false);
      },
      () => {
        setResetLoading(false);
      }
    );
  };

  const changeInputName = (e) => {
    if (isExistCheck) setIsExistCheck(false);
  };

  const existCheck = () => {
    if (!nameRef.current.value)
      return showErrorMessage("PLEASE_INPUT_APPLICATION_NAME");
    if (!nameTest(nameRef.current.value)) {
      return FailToTest(
        nameRef.current,
        showErrorMessage("APPLICATION_NAME_RULE_ERROR")
      );
    }
    CustomAxiosGet(
      checkApplicationExistenceApi(adminId, nameRef.current.value),
      (data) => {
        const { duplicate } = data;
        if (duplicate) {
          showErrorMessage("IS_EXIST_APPLICATION");
        } else {
          showSuccessMessage("IS_NOT_EXIST_APPLICATION");
          setIsExistCheck(true);
        }
      }
    );
  };

  const onFinish = (e) => {
    e.preventDefault();
    // const { name, domain, redirectUri, status, policy } = e.target.elements;
    const { name, domain, redirectUri, policy } = e.target.elements;
    if (!name.value.length) {
      return FailToTest(
        name,
        showErrorMessage("PLEASE_INPUT_APPLICATION_NAME")
      );
    }
    if (!nameTest(name.value)) {
      return FailToTest(name, showErrorMessage("APPLICATION_NAME_RULE_ERROR"));
    }
    if (!isExistCheck) return showErrorMessage("PLEASE_CHECK_EXIST");
    if (!domain.value.length) {
      return FailToTest(domain, showErrorMessage("PLEASE_INPUT_DOMAIN"));
    }
    if (!doaminTest(domain.value)) {
      return FailToTest(domain, showErrorMessage("DOMAIN_RULE_ERROR"));
    }
    if (!(domain.value + redirectUri.value).length) {
      return FailToTest(
        redirectUri,
        showErrorMessage("PLEASE_INPUT_REDIRECT_URI")
      );
    }
    if (!doaminTest(domain.value + redirectUri.value)) {
      return FailToTest(
        redirectUri,
        showErrorMessage("REDIRECT_URI_RULE_ERROR")
      );
    }
    CustomAxiosPut(
      updateApplicationApi(adminId, appId),
      {
        name: name.value,
        domain: domain.value,
        redirectUri: domain.value + redirectUri.value,
        // status: status.value.toUpperCase(),
        policyId: policy.value,
      },
      (data) => {
        showSuccessMessage("UPDATE_SUCCESS");
        tableDataUpdate(appId, data);
        navigate("/Applications");
      }
    );
  };

  const copySecretKey = (e) => {
    e.preventDefault();
    secretKeyRef.current.select();
    document.execCommand("copy");
    showSuccessMessage("COPY_SUCCESS");
    secretKeyRef.current.setSelectionRange(0, 0);
  };

  return (
    <>
      <div className="ApplicationsBox">
        <form className="ApplicationForm" onSubmit={onFinish}>
          <div className="Application-label-input-box">
            <label>
              <FormattedMessage id="APPLICATIONNAME" />
            </label>
            <input
              name="name"
              ref={nameRef}
              onChange={changeInputName}
              maxLength={16}
            />
            <CustomButton
              className="selectButton button"
              type="button"
              disabled={isExistCheck}
              onClick={existCheck}
            >
              <FormattedMessage id="DUPLICATECHECK" />
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>
              <FormattedMessage id="SECRETKEY" />
            </label>
            <div className="secretKey-container">
              <input name="secretKey" readOnly ref={secretKeyRef} />
              <div className="copyButton-container">
                <button className="copyButton" onClick={copySecretKey}>
                  <CopyOutlined /> Copy
                </button>
              </div>
            </div>
            <CustomButton
              type="button"
              className="button"
              onClick={openResetModal}
            >
              <FormattedMessage id="SECRETKEYRESET" />
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label>
              <FormattedMessage id="DOMAIN" />
            </label>
            <input name="domain" ref={doaminRef} readOnly maxLength={48} />
          </div>
          <div className="Application-label-input-box">
            <label>
              <FormattedMessage id="REDIRECTURI" />
            </label>
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                width: "65%",
                alignItems: "center",
              }}
            >
              {doaminRef.current ? doaminRef.current.value : ""}
              <input
                name="redirectUri"
                ref={redirectURIRef}
                maxLength={48}
                style={{ width: "100%", marginLeft: "12px" }}
              />
            </span>
          </div>
          {/* <div className="Application-label-input-box">
            <label><FormattedMessage id="STATUS"/></label>
            <input
              name="status"
              value="ACTIVE"
              disabled={isCloud}
              ref={statusRef}
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">Active</label>
            <input
              name="status"
              value="INACTIVE"
              disabled={isCloud}
              ref={statusRef2}
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">Inactive</label>
          </div> */}
          <div className="Application-label-input-box">
            <label>
              <FormattedMessage id="POLICYSETTING" />
            </label>
            <select name="policy" ref={policyRef}>
              <option value={globalPolicy && globalPolicy.policyId}>
                {formatMessage({ id: "DEFAULTPOLICY" })}
              </option>
              {customPolicies.map((p, ind) => (
                <option key={ind} value={p.policyId}>
                  {p.title}
                </option>
              ))}
            </select>
          </div>
          <Space className="cud">
            <Button htmlType="submit">
              <UserSwitchOutlined />
              <FormattedMessage id="SAVE" />
            </Button>
          </Space>
        </form>
      </div>
      <CustomConfirm
        visible={resetVisible}
        cancelCallback={closeResetModal}
        okLoading={resetLoading}
        confirmCallback={resetSecretKey}
      >
        <div className="reset-notice-text-container">
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
            <FormattedMessage id="WARNING" />
          </p>
          <p>
            <FormattedMessage id="WARNINGDESCRIPTION" />
          </p>
        </div>
      </CustomConfirm>
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetail);
