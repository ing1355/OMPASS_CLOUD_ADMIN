import React, { useRef, useState } from "react";
import "./Applications.css";
import {
  CustomAxiosGet,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import {
  addApplicationApi,
  checkApplicationExistenceApi,
} from "../../../Constants/Api_Route";
import { useNavigate } from "react-router";
import {
  doaminTest,
  FailToTest,
  ApplicationNameTest,
} from "../../../Constants/InputRules";
import ActionCreators from "../../../redux/actions";
import { FormattedMessage, useIntl } from "react-intl";

const AppDetailsAdd = ({
  userProfile,
  tableDataAdd,
  showSuccessMessage,
  showErrorMessage,
  globalPolicy,
  customPolicies,
}) => {
  const [inputName, setInputName] = useState("");
  const [isExistCheck, setIsExistCheck] = useState(false);
  const inputNameRef = useRef(null);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const onFinish = (e) => {
    e.preventDefault();
    const { domain, redirectUri, name, policy, status } = e.target.elements;
    if (!isExistCheck) return showErrorMessage("PLEASE_CHECK_EXIST");
    if (!name.value.length) {
      return FailToTest(name, showErrorMessage("PLEASE_INPUT_APPLICATION_NAME"));
    }
    if (!ApplicationNameTest(name.value)) {
      return FailToTest(name, showErrorMessage("APPLICATION_NAME_RULE_ERROR"));
    }
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
    CustomAxiosPost(
      addApplicationApi(userProfile.adminId),
      {
        domain: domain.value,
        name: name.value,
        policyId: policy.value,
        redirectUri: redirectUri.value,
        status: status.value,
      },
      (data) => {
        showSuccessMessage("APPLICATION_ADD_SUCCESS");
        tableDataAdd(data);
        navigate("/Applications");
      }
    );
  };

  const existCheck = () => {
    if (!inputName) return showErrorMessage("PLEASE_INPUT_APPLICATION_NAME")
    if (!ApplicationNameTest(inputName)) {
      return FailToTest(inputNameRef.current, showErrorMessage("APPLICATION_NAME_RULE_ERROR"));
    }
    CustomAxiosGet(
      checkApplicationExistenceApi(userProfile.adminId, inputName),
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

  const changeInputName = (e) => {
    setInputName(e.target.value);
    if (isExistCheck) setIsExistCheck(false);
  };

  return (
    <>
      <div className="ApplicationsBox">
        <form onSubmit={onFinish}>
          <div className="ApplicationForm">
            <div className="Application-label-input-box">
              <label>
                <FormattedMessage id="APPLICATIONNAME" />
              </label>
              <input
                name="name"
                ref={inputNameRef}
                maxLength={24}
                placeholder={formatMessage({
                  id: "PLEASE_INPUT_APPLICATION_NAME",
                })}
                onChange={changeInputName}
              />
              <button
                className="selectButton button"
                type="button"
                disabled={isExistCheck}
                onClick={existCheck}
              >
                <FormattedMessage id="DUPLICATECHECK" />
              </button>
            </div>

            <div className="Application-label-input-box">
              <label>
                <FormattedMessage id="DOMAIN" />
              </label>
              <input
                name="domain"
                maxLength={48}
                placeholder={formatMessage({ id: "PLEASE_INPUT_DOMAIN" })}
              />
            </div>
            <div className="Application-label-input-box">
              <label>
                <FormattedMessage id="REDIRECTURI" />
              </label>
              <input
                name="redirectUri"
                maxLength={48}
                placeholder={formatMessage({ id: "PLEASE_INPUT_REDIRECT_URI" })}
              />
            </div>
            <div className="Application-label-input-box">
              <label>
                <FormattedMessage id="STATUS" />
              </label>
              <input
                name="status"
                value="ACTIVE"
                type="radio"
                style={{ width: "15px" }}
              />
              <label className="label-radio">Active</label>
              <input
                name="status"
                value="INACTIVE"
                type="radio"
                defaultChecked
                style={{ width: "15px" }}
              />
              <label className="label-radio">Inactive</label>
            </div>
            <div className="Application-label-input-box">
              <label>
                <FormattedMessage id="POLICYSETTING" />
              </label>
              <select name="policy">
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

            <button className="Application-Save-button button" type="submit">
              <FormattedMessage id="REGISTER" />
            </button>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsAdd);
