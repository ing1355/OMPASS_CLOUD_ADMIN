import React from "react";
import "./Applications.css";
import { Form } from "antd";
import { CustomAxiosPost } from "../../../Functions/CustomAxios";
import { getApplicationDetailApi } from "../../../Constants/Api_Route";
import { connect } from "react-redux";

const AppDetailsUpdate = ({userProfile}) => {
  return (
    <>
      <div className="ApplicationsBox">
        <Form
          onFinish={(values) => {
            console.log(values);
            CustomAxiosPost(
              getApplicationDetailApi(userProfile.adminId),
              {
                domain: "https://www.ompass.kr",
                policyId: 0,
                redirectUri: "https://www.ompass.kr",
                status: "test",
              },
              (res) => {
                console.log(res);
              }
            );
          }}
        >
          <div className="ApplicationsTitle">
            <span>
              <h2>세부</h2> <button>Reset Client Secret</button>
            </span>
          </div>

          <Form.Item
            className="inputBox"
            label="Integration key"
            name="integrationKey"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="DIGHW6U9B6980J7KRZRB" />
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Secret Key"
            name="secretKey"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="Click to view." />
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Domain Address"
            name="domainAddress"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="도메인 주소를 입력하세요." />
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Redirect URL"
            name="redirectURL"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="Redirect URL를 입력하세요." />
          </Form.Item>
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
          <button
            className="ApplicationsSave"
            type="submit"
          >
            저장
          </button>
        </Form>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppDetailsUpdate);