import React from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { message } from "antd";

const AdminUpdate = (props) => {
  return (
    <>
      <div className="AdminBox">
        <form className="updateForm">
          <div className="inputBox">
            <span>Name</span>
            <input placeholder="이름을 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Email address</span>
            <p className="updateInfo">dbflagovl12@naver.com</p>
          </div>
          <div className="inputBox">
            <span>Last login</span>
            <p className="updateInfo">Nov 9, 2021 6:42 AM (UTC)</p>
          </div>

          <div className="inputBox">
            <span>New password</span>
            <input placeholder="패스워드를 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Confirm new password</span>
            <input placeholder="패스워드를 입력하세요." />
          </div>
          <div className="inputBox2">
            <span>Phone</span>
            <div className="phoneBox">
              <PhoneInput
                className="phoneInput"
                country={"kr"}
                preferredCountries={["kr", "us"]}
              />
            </div>
          </div>
        </form>
        <button
          className="adminUpdateButton"
          onClick={() => {
            props.setAdmin(true);
            props.setUpdate(false);
            message.success("변경되었습니다");
          }}
        >
          변경
        </button>
      </div>
    </>
  );
};

export default AdminUpdate;
