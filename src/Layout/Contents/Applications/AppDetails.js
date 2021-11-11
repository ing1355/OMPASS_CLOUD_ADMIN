import React from "react";
import "./Applications.css";

import "antd/dist/antd.css";
import { message } from "antd";

const AppDetails = (props) => {
  return (
    <>
      <div className="ApplicationsBox">
        <form>
          <div className="ApplicationsTitle">
            <span>
              <h2>세부</h2> <button>Reset Client Secret</button>
            </span>
          </div>

          <div className="inputBox">
            <span>Integration key</span>
            <input placeholder="DIGHW6U9B6980J7KRZRB" />
            <button className="select">select</button>
          </div>
          <div className="inputBox">
            <span>Secret Key</span>
            <input placeholder="Click to view." />
            <button className="select">select</button>
          </div>
          <div className="inputBox">
            <span>Domain Address</span>
            <input placeholder="도메인 주소를 입력하세요." />
            <button className="select">select</button>
          </div>
          <div className="inputBox">
            <span>Redirect URL</span>
            <input placeholder="Redirect URL를 입력하세요." />
            <button className="select">select</button>
          </div>
        </form>
        <form>
          <div className="ApplicationsTitle">
            <h2>정책</h2>
            <p>
              정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
              방법을 정의합니다.
              <p>
                글로벌 정책은 항상 적용되지만 사용자 지정 정책으로 해당 규칙을
                재정의할 수 있습니다.
              </p>
            </p>
          </div>
          <div className="inputBox">
            <span>Application policy</span>
            {/* <button>모든 사용자에게 정책 적용</button> */}
          </div>
          <div className="inputBox">
            <span>Global policy</span>
            {/* <input placeholder="이메일을 입력하세요." /> */}
          </div>
        </form>
        <button
          className="ApplicationsSave"
          onClick={() => {
            props.setApplications(true);
            message.success("추가되었습니다.");
          }}
        >
          저장
        </button>
      </div>
    </>
  );
};

export default AppDetails;
