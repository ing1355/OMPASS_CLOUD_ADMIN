import React from "react";
import "./Admins.css";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "antd/dist/antd.css";
import { message } from "antd";

const AdminAdd = (props) => {
  return (
    <>
      <div className="AdminBox">
        <form>
          <div className="inputBox">
            <span>Name</span>
            <input placeholder="이름을 입력하세요." />
          </div>
          <div className="inputBox">
            <span>Email address</span>
            <input placeholder="이메일을 입력하세요." />
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
          <div className="checkBox">
            <span>Complete account setup</span>
            <div>
              <span>
                <input type="checkbox" name="xxx" value="yyy" checked />
                <p>Automatically send an account setup link via email</p>
              </span>
              <p>
                This administrator will receive an email with instructions to
                complete their account setup
              </p>
              <button
                className="adminAddButton"
                onClick={() => {
                  props.setAdmin(true);
                  props.setAdminAdd(false);
                  message.success("추가되었습니다.");
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
