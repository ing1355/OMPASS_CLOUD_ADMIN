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
  checkApplicationExistenceApi,
} from "../../../Constants/Api_Route";
import { useHistory } from "react-router";
import {
  doaminTest,
  FailToTest,
  nameTest,
} from "../../../Constants/InputRules";

const AppDetailsAdd = ({ userProfile, tableDataAdd }) => {
  const [inputName, setInputName] = useState("");
  const [isExistCheck, setIsExistCheck] = useState(false);
  const history = useHistory();

  const onFinish = (e) => {
    e.preventDefault();
    const { domain, redirectUri, name } = e.target.elements;
    if (!isExistCheck)
      return message.error("이름 중복체크를 먼저 진행해주세요.");
    if (!name.value.length) {
      return FailToTest(name, "어플리케이션명을 입력해주세요.");
    }
    if (!nameTest(name.value)) {
      return FailToTest(name, "어플리케이션명의 형식이 잘못되었습니다.");
    }
    if (!domain.value.length) {
      return FailToTest(domain, "도메인을 입력해주세요.");
    }
    if (!doaminTest(domain.value)) {
      return FailToTest(domain, "도메인 형식이 잘못되었습니다.");
    }
    if (!redirectUri.value.length) {
      return FailToTest(redirectUri, "리다이렉트 URI를 입력해주세요.");
    }
    if (!doaminTest(redirectUri.value)) {
      return FailToTest(redirectUri, "리다이렉트 URI 형식이 잘못되었습니다.");
    }
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
        message.success("어플리케이션 등록에 성공하였습니다.");
        tableDataAdd(data);
        history.push("/Applications");
      },
      () => {
        message.error("어플리케이션 등록에 실패하였습니다.");
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

  const changeInputName = (e) => {
    setInputName(e.target.value);
    if (isExistCheck) setIsExistCheck(false);
  };

  return (
    <>
      <div className="ApplicationsBox">
        <form onSubmit={onFinish}>
          <div className="ApplicationForm">
            <div className="ApplicationsTitle">
              <span>
                <h2>항목</h2>
              </span>
            </div>
            <div className="Application-label-input-box">
              <label>어플리케이션</label>
              <input
                name="name"
                placeholder="어플리케이션 이름을 입력하세요."
                onChange={changeInputName}
              />
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
              <label>도메인 주소</label>
              <input name="domain" placeholder="도메인 주소를 입력하세요." />
            </div>
            <div className="Application-label-input-box">
              <label>리다이렉트 URL</label>
              <input
                name="redirectUri"
                placeholder="Redirect URL를 입력하세요."
              />
            </div>
            <div className="ApplicationsTitle" style={{ marginBottom: "0" }}>
              <h2 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                정책
              </h2>
              <p>해당 어플리케이션에 커스텀 정책을 적용할 수 있습니다.</p>
            </div>
            <select name="order">
              <option selected disabled>
                정책 설정
              </option>
              <option value="1">dddddddddd</option>
              <option value="2">ddddddddd</option>
            </select>
            <button className="Application-Save-button button" type="submit">
              등록
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
