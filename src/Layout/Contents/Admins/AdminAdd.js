import React, { useRef, useState } from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { message } from "antd";
import {
  CustomAxiosGet,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import {
  addSubAdminApi,
  checkSubAdminExistenceApi,
} from "../../../Constants/Api_Route";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import {
  emailTest,
  FailToTest,
  mobileTest,
  nameTest,
} from "../../../Constants/InputRules";
import { FormattedMessage, useIntl } from "react-intl";
import ActionCreators from "../../../redux/actions";

const AdminAdd = ({ userProfile, showErrorMessage, showSuccessMessage }) => {
  const { adminId } = userProfile;
  const [existCheck, setExistCheck] = useState(false);
  const [inputMobile, setInputMobile] = useState(null);
  const [inputCountry, setInputCountry] = useState(null);
  const [inputDialCode, setInputDialCode] = useState("");
  const [inputEmail, setInputEmail] = useState(null);
  const history = useHistory();
  const { formatMessage } = useIntl();

  const changeMobileInput = (value, countryInfo) => {
    const { countryCode, dialCode } = countryInfo;
    setInputCountry(countryCode.toUpperCase());
    setInputMobile(value);
    setInputDialCode(dialCode);
  };

  const changeEmailInput = (e) => {
    setInputEmail(e.target.value);
  };

  const existCheckFunc = () => {
    if (!inputEmail) return showErrorMessage("PLEASE_INPUT_EAMIL");
    if (!emailTest(inputEmail)) return showErrorMessage("EMAIL_RULE_ERROR");
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
    const { email, lastName, firstName, agreeCheck, mobile } =
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
    if (mobile.value.split(" ").length === 1) {
      return FailToTest(mobile, showErrorMessage('PLEASE_INPUT_MOBILE'));
    }
    // if(!mobileTest(mobile.value.split(' ').slice(1,).join(''))) {
    //   return FailToTest(mobile,'잘못된 전화번호 형식입니다.')
    // }
    // if (!agreeCheck.checked) return showErrorMessage('PLEASE_CHECK_CHECKBOX');
    CustomAxiosPost(addSubAdminApi(adminId), {
      country: inputCountry,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: inputMobile.slice(inputDialCode.length),
      dialCode: inputDialCode,
      role: "ADMIN",
    });
    showSuccessMessage('EMAIL_SEND_SUCCESS')
    history.push("/Admins");
  };

  return (
    <>
      <div className="AdminBox">
        <form onSubmit={onFinish}>
          <div className="inputBox">
            <span><FormattedMessage id="FIRSTNAME"/></span>
            <input name="firstName" placeholder={formatMessage({ id: 'PLEASE_INPUT_FIRST_NAME' })} />
          </div>
          <div className="inputBox">
            <span><FormattedMessage id="LASTNAME"/></span>
            <input name="lastName" placeholder={formatMessage({ id: 'PLEASE_INPUT_NAME' })} />
          </div>
          <div className="inputBox">
            <span><FormattedMessage id="EMAIL"/></span>
            <input
              name="email"
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
                inputProps={{
                  name: "mobile",
                }}
                value={inputMobile}
                onChange={changeMobileInput}
                preferredCountries={["kr", "us"]}
              />
            </div>
          </div>
          <div className="checkBox">
            {/* <span>계정 설정</span>
            <div>
              <span>
                <input name="agreeCheck" type="checkbox" />
                <p>이메일을 통해 자동으로 계정 설정 링크 보내기</p>
              </span>
              <p>
                이 관리자는 계정 설정을 완료하기 위한 지침이 포함된 이메일을
                받게 됩니다.
              </p>
            </div> */}
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
