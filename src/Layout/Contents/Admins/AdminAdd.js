import React, { useState } from "react";
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
import { emailTest, nameTest } from "../../../Constants/InputRules";
import { useIntl } from "react-intl";

const AdminAdd = ({ userProfile }) => {
  const { adminId } = userProfile;
  const [existCheck, setExistCheck] = useState(false);
  const [inputMobile, setInputMobile] = useState(null);
  const [inputCountry, setInputCountry] = useState(null);
  const [inputEmail, setInputEmail] = useState(null);
  const history = useHistory();
  const {formatMessage} = useIntl()

  const changeMobileInput = (value, countryInfo) => {
    const { countryCode } = countryInfo;
    setInputCountry(countryCode.toUpperCase());
    setInputMobile(value);
  };

  const changeEmailInput = (e) => {
    setInputEmail(e.target.value);
  };

  const existCheckFunc = () => {
    if(!inputEmail) return message.error('이메일을 입력해주세요.')
    if(!emailTest(inputEmail)) return message.error(formatMessage({id: 'EMAIL_RULE_ERROR'}))
    CustomAxiosGet(checkSubAdminExistenceApi(adminId, inputEmail), data => {
      if(data.duplicate) {
        setExistCheck(false);
        message.error("중복입니다.");
      } else {
        setExistCheck(true);
        message.success("사용 가능한 이메일입니다.");
      }
    });
  };

  const onFinish = (e) => {
    const { email, lastName, firstName, agreeCheck } = e.target.elements;
    e.preventDefault();
    if(!existCheck) return message.error('중복체크 해주세요.')
    if(!agreeCheck.checked) return message.error('체크박스에 체크해주세요.')
    if(!emailTest(email.value)) return message.error(formatMessage({id:'EMAIL_RULE_ERROR'}))
    if(!nameTest(firstName.value)) return message.error(formatMessage({id:'NAME_RULE_ERROR'}))
    if(!nameTest(lastName.value)) return message.error(formatMessage({id:'NAME_RULE_ERROR'}))
    CustomAxiosPost(
      addSubAdminApi(adminId),
      {
        country: inputCountry,
        email: email.value,
        firstName: firstName.value,
        lastName: lastName.value,
        phone: inputMobile,
        role: "ADMIN",
      });
    message.success("인증 메일 발송에 성공하였습니다.");
    history.push("/Admins");
  };

  return (
    <>
      <div className="AdminBox">
        <form onSubmit={onFinish}>
          <div className="inputBox">
            <span>First Name</span>
            <input name="firstName" placeholder="이름을 입력하세요."/>
          </div>
          <div className="inputBox">
            <span>Last Name</span>
            <input name="lastName" placeholder="이름을 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Email address</span>
            <input
              name="email"
              placeholder="이메일을 입력하세요."
              onChange={changeEmailInput}
            />
            <button
              className="select button"
              type="button"
              onClick={existCheckFunc}
            >
              중복체크
            </button>
          </div>
          <div className="inputBox2">
            <span>Phone</span>
            <div className="phoneBox">
              <PhoneInput
                className="phoneInput"
                country={"kr"}
                value={inputMobile}
                onChange={changeMobileInput}
                inputProps={{
                  name: 'phone',
                  required: true
                }}
                preferredCountries={["kr", "us"]}
              />
            </div>
          </div>
          <div className="checkBox">
            <span>Complete account setup</span>
            <div>
              <span>
                <input name="agreeCheck" type="checkbox" />
                <p>Automatically send an account setup link via email</p>
              </span>
              <p>
                This administrator will receive an email with instructions to
                complete their account setup
              </p>
              <button className="adminAddButton button" type="submit">
                관리자 추가
              </button>
            </div>
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminAdd);
