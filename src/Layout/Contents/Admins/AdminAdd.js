import React, { useState } from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { message } from "antd";
import { CustomAxiosPost } from "../../../Functions/CustomAxios";
import { addAdminApi } from "../../../Constants/Api_Route";

const AdminAdd = (props) => {
  const [inputMobile, setInputMobile] = useState(null);
  const [inputCountry, setInputCountry] = useState(null);

  const changeMobileInput = (value,countryInfo) => {
    const {countryCode} = countryInfo;
    setInputCountry(countryCode);
    setInputMobile(value);
  }

  const onFinish = (e) => {
    const {email, lastName, firstName} = e.target.elements
    e.preventDefault();
    CustomAxiosPost(addAdminApi(localStorage.getItem('adminId')),{
      country : inputCountry,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      phone: inputMobile,
      role: 'ADMIN'
    })
  }
  
  return (
    <>
      <div className="AdminBox">
        <form onSubmit={onFinish}>
          <div className="inputBox">
            <span>First Name</span>
            <input name="firstName" placeholder="이름을 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Last Name</span>
            <input name="lastName" placeholder="이름을 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Email address</span>
            <input name="email" placeholder="이메일을 입력하세요." />
          </div>
          <div className="inputBox2">
            <span>Phone</span>
            <div className="phoneBox">
              <PhoneInput
                className="phoneInput"
                country={"kr"}
                value={inputMobile}
                onChange={changeMobileInput}
                preferredCountries={["kr", "us"]}
              />
            </div>
          </div>
          <div className="checkBox">
            <span>Complete account setup</span>
            <div>
              <span>
                <input type="checkbox" checked />
                <p>Automatically send an account setup link via email</p>
              </span>
              <p>
                This administrator will receive an email with instructions to
                complete their account setup
              </p>
              <button
                className="adminAddButton"
                type="submit"
                onClick={() => {
                  // props.setAdmin(true);
                  // props.setAdminAdd(false);
                  // message.success("추가되었습니다.");
                }}
              >
                관리자 추가
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminAdd;
