import React, { useRef, useState } from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  CustomAxiosGet,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import {
  addSubAdminApi,
  checkSubAdminExistenceApi,
} from "../../../Constants/Api_Route";
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import {
  emailTest,
  FailToTest,
  nameTest,
} from "../../../Constants/InputRules";
import { FormattedMessage, useIntl } from "react-intl";
import ActionCreators from "../../../redux/actions";

const AdminAdd = ({ userProfile, showErrorMessage, showSuccessMessage }) => {
  const { adminId } = userProfile;
  const [existCheck, setExistCheck] = useState(false);
  const [inputCountry, setInputCountry] = useState(null);
  const [inputFormat, setInputFormat] = useState(null);
  const [inputDialCode, setInputDialCode] = useState(null);
  const [inputEmail, setInputEmail] = useState(null);
  const emailRef = useRef(null);
  const navigate = useNavigate();
  const { formatMessage } = useIntl();

  const changeMobileInput = (value, countryInfo) => {
    const { countryCode, format, dialCode } = countryInfo;
    if(inputFormat !== format) setInputFormat(format);
    if(inputDialCode !== dialCode) setInputDialCode(dialCode);
    setInputCountry(countryCode.toUpperCase());
  };

  const changeEmailInput = (e) => {
    setInputEmail(e.target.value);
  };

  const existCheckFunc = () => {
    if (!inputEmail) {
      emailRef.current.focus();
      return showErrorMessage("PLEASE_INPUT_EMAIL");
    }
    if (!emailTest(inputEmail)) {
      emailRef.current.focus();
      return showErrorMessage("EMAIL_RULE_ERROR");
    }
    CustomAxiosGet(checkSubAdminExistenceApi(adminId, inputEmail), (data) => {
      if (data.duplicate) {
        setExistCheck(false);
        showErrorMessage('IS_EXIST_EMAIL');
      } else {
        setExistCheck(true);
        showSuccessMessage('IS_NOT_EXIST_EMAIL');
      }
    });
  };

  const onFinish = (e) => {
    const { email, lastName, firstName, mobile } =
      e.target.elements;
    e.preventDefault();
    if (!firstName.value.length) {
      return FailToTest(firstName, showErrorMessage('PLEASE_INPUT_FIRST_NAME'));
    }
    if (!nameTest(firstName.value)) {
      return FailToTest(firstName, showErrorMessage("NAME_RULE_ERROR"));
    }
    if (!lastName.value.length) {
      return FailToTest(lastName, showErrorMessage('PLEASE_INPUT_NAME'));
    }
    if (!nameTest(lastName.value)) {
      return FailToTest(lastName, showErrorMessage("NAME_RULE_ERROR"));
    }
    if (!email.value.length) {
      return FailToTest(email, showErrorMessage('PLEASE_INPUT_EMAIL'));
    }
    if (!emailTest(email.value)) {
      return FailToTest(email, showErrorMessage("EMAIL_RULE_ERROR"));
    }
    if (!existCheck) return showErrorMessage('PLEASE_CHECK_EXIST');
    if(!inputFormat) return showErrorMessage('PLEASE_INPUT_MOBILE');
    // if(mobile.value.length !== inputFormat.length) return showErrorMessage('PLEASE_COMPLETE_ADMIN_MOBILE')
    if(inputDialCode && !mobile.value.startsWith('+' + inputDialCode)) {
      if(mobile.value.length < inputDialCode.length + 1) return showErrorMessage('NO_DIAL_CODE')
    }
    CustomAxiosPost(addSubAdminApi(adminId), {
      country: inputCountry ? inputCountry : 'KR',
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: mobile.value,
      role: "ADMIN",
    });
    alert(formatMessage({id:'EMAIL_SEND_SUCCESS'}))
    navigate("/Admins");
  };
  
  return (
    <>
      <div className="AdminBox">
        <form onSubmit={onFinish}>
          <div className="inputBox">
            <span><FormattedMessage id="FIRSTNAME"/></span>
            <input name="firstName" maxLength={16} placeholder={formatMessage({ id: 'PLEASE_INPUT_FIRST_NAME' })} />
          </div>
          <div className="inputBox">
            <span><FormattedMessage id="LASTNAME"/></span>
            <input name="lastName" maxLength={16} placeholder={formatMessage({ id: 'PLEASE_INPUT_NAME' })} />
          </div>
          <div className="inputBox">
            <span><FormattedMessage id="EMAIL"/></span>
            <input
              name="email"
              maxLength={48}
              ref={emailRef}
              placeholder={formatMessage({ id: 'PLEASE_INPUT_EMAIL' })}
              onChange={changeEmailInput}
            />
            <button
              className="select button"
              type="button"
              onClick={existCheckFunc}
            >
              <FormattedMessage id="DUPLICATECHECK"/>
            </button>
          </div>
          <div className="inputBox2">
            <span><FormattedMessage id="MOBILE"/></span>
            <div className="phoneBox">
              <PhoneInput
                className="phoneInput"
                country={"kr"}
                jumpCursorToEnd
                inputProps={{
                  name: "mobile",
                }}
                onChange={changeMobileInput}
                preferredCountries={["kr", "us"]}
              />
            </div>
          </div>
          <div className="checkBox">
            <button className="adminAddButton button" type="submit">
              <FormattedMessage id="REGISTER"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminAdd);
