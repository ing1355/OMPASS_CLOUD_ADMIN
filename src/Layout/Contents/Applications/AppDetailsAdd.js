import React, { useState } from "react";
import "./Applications.css";

import "antd/dist/antd.css";
import { message, Form } from "antd";
import {
  CustomAxiosGet,
  CustomAxiosPost,
} from "../../../Functions/CustomAxios";
import { connect } from "react-redux";
import {
  addApplicationApi,
  checkApplicationExistenceApi
} from "../../../Constants/Api_Route";
import { useHistory } from "react-router";

const AppDetailsAdd = ({ userProfile, tableDataAdd }) => {
  const [inputName, setInputName] = useState("");
  const [isExistCheck, setIsExistCheck] = useState(false);
  const history = useHistory();

  const onFinish = (e) => {
    e.preventDefault();
    if (!isExistCheck)
      return message.error("이름 중복체크를 먼저 진행해주세요.");
    const { domain, redirectUri, name } = e.target.elements;

    CustomAxiosPost(
      addApplicationApi(userProfile.adminId),
      {
        domain: domain.value,
        name: name.value,
        policyId: 0,
        redirectUri: redirectUri.value,
        status: "Inactive",
      },
      (data) => {
        tableDataAdd(data);
        history.push("/Applications");
      }
    );
  };

  const existCheck = () => {
    if (!inputName) return message.error("이름을 입력해주세요.");
    CustomAxiosGet(
      checkApplicationExistenceApi(userProfile.adminId, inputName),
      (data) => {
        const { duplicate } = data;
        if (duplicate) {
          message.error("이미 존재하는 이름입니다.");
        } else {
          message.success("사용 가능한 이름입니다.");
          setIsExistCheck(true);
        }
      }
    );
  };

  const changeInputName = e => {
    setInputName(e.target.value)
    if (isExistCheck) setIsExistCheck(false)
  }

  return (
    <>
      <div className="ApplicationsBox">
        <form onSubmit={onFinish}>
          <div className="ApplicationForm">
            <div className="ApplicationsTitle">
              <span>
                <h2>세부</h2>
              </span>
            </div>
            <div className="Application-label-input-box">
              <label>Name</label>
              <input name="name" placeholder="Click to view." onChange={changeInputName} />
              <button
                className="selectButton button"
                type="button"
                disabled={isExistCheck}
                onClick={existCheck}
              >
                중복체크
              </button>
            </div>
            <div className="Application-label-input-box">
              <label>Domain Address</label>
              <input name="domain" placeholder="도메인 주소를 입력하세요." />
            </div>
            <div className="Application-label-input-box">
              <label>Redirect URL</label>
              <input name="redirectUri" placeholder="Redirect URL를 입력하세요." />
            </div>
            <div className="ApplicationsTitle">
              <h2>정책</h2>
              <p>
                정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
                방법을 정의합니다.
              <br />
              글로벌 정책은 항상 적용되지만 사용자 지정 정책으로 해당 규칙을
              재정의할 수 있습니다.
              </p>
            </div>
            <div className="inputBox">
              <span>Application policy</span>
            </div>
            <div className="inputBox">
              <span>Global policy</span>
            </div>
            <button className="ApplicationsSave button" type="submit">
              추가
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
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsAdd);
