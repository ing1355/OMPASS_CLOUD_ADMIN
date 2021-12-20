import { message } from "antd";
import React, { useLayoutEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  checkApplicationExistenceApi,
  deleteApplicationApi,
  getApplicationDetailApi,
  getNewSecretKeyApi,
  updateApplicationApi,
} from "../../../Constants/Api_Route";
import {
  CustomAxiosGet,
  CustomAxiosPatch,
  CustomAxiosPut,
  CustomAxiosDelete,
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

const ApplicationDetail = ({
  userProfile,
  tableDataUpdate,
  policies,
  showSuccessMessage,
  showErrorMessage,
}) => {
  const history = useHistory();
  const { appId } = useParams();
  const { adminId } = userProfile;
  const nameRef = useRef(null);
  const doaminRef = useRef(null);
  const redirectURIRef = useRef(null);
  const statusRef = useRef(null);
  const statusRef2 = useRef(null);
  const secretKeyRef = useRef(null);
  const policyRef = useRef(null);
  const {formatMessage} = useIntl()
  const [isCloud, setIsCloud] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [isExistCheck, setIsExistCheck] = useState(true);

  useLayoutEffect(() => {
    CustomAxiosGet(getApplicationDetailApi(adminId, appId), (data) => {
      const {
        name,
        secretKey,
        domain,
        redirectUri,
        status,
        integrationKey,
        policyId,
        cloud
      } = data;
      nameRef.current.value = name;
      doaminRef.current.value = domain;
      redirectURIRef.current.value = redirectUri;
      if (status === "ACTIVE") statusRef.current.checked = true;
      else statusRef2.current.checked = true;
      secretKeyRef.current.value = secretKey;
      policyRef.current.value = policyId;
      setIsCloud(cloud);
    });
  }, []);

  const resetSecretKey = () => {
    setResetLoading(true);
    CustomAxiosPatch(
      getNewSecretKeyApi(adminId, appId),
      null,
      (data) => {
        secretKeyRef.current.value = data.secretKey;
        setResetLoading(false);
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
    if (!nameRef.current.value) return showErrorMessage("PLEASE_INPUT_APPLICATION_NAME")
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
    const { name, domain, redirectUri, status, policy } = e.target.elements;
    console.log(policy.value);
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
    if (!redirectUri.value.length) {
      return FailToTest(
        redirectUri,
        showErrorMessage("PLEASE_INPUT_REDIRECT_URI")
      );
    }
    if (!doaminTest(redirectUri.value)) {
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
        redirectUri: redirectUri.value,
        status: status.value.toUpperCase(),
        policyId: policy.value === 'null' ? null : policy.value,
      },
      (data) => {
        showSuccessMessage("UPDATE_SUCCESS");
        tableDataUpdate(appId, data);
        history.push("/Applications");
      },
      () => {
        showErrorMessage("UPDATE_FAIL");
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
            <label><FormattedMessage id="APPLICATION"/></label>
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
              <FormattedMessage id="DUPLICATECHECK"/>
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label><FormattedMessage id="SECRETKEY"/></label>
            <div className="secretKey-container">
              <input name="secretKey" readOnly ref={secretKeyRef} />
              <div className="copyButton-container">
                <button className="copyButton" onClick={copySecretKey}>
                  <CopyOutlined /> Copy
                </button>
              </div>
            </div>
            <CustomButton
              loading={resetLoading}
              type="button"
              className="button"
              onClick={resetSecretKey}
            >
              <FormattedMessage id="SECRETKEYRESET"/>
            </CustomButton>
          </div>
          <div className="Application-label-input-box">
            <label><FormattedMessage id="DOMAIN"/></label>
            <input name="domain" ref={doaminRef} readOnly={isCloud}/>
          </div>
          <div className="Application-label-input-box">
            <label><FormattedMessage id="REDIRECTURI"/></label>
            <input name="redirectUri" ref={redirectURIRef} readOnly={isCloud}/>
          </div>
          <div className="Application-label-input-box">
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
          </div>
          <div className="Application-label-input-box">
            <label><FormattedMessage id="POLICYSETTING"/></label>
            <select name="policy" ref={policyRef}>
              <option value="null">{formatMessage({id:'DEFAULTPOLICY'})}</option>
              {
                policies.map((p,ind) => <option key={ind} value={p.policyId}>{p.title}</option>)
              }
            </select>
          </div>
          <Space className="cud">
            <Button htmlType="submit">
              <UserSwitchOutlined />
                <FormattedMessage id="SAVE"/>
            </Button>
          </Space>
        </form>
      </div>
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
