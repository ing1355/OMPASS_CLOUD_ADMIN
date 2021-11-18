import React from "react";
import "./Applications.css";

import "antd/dist/antd.css";
import { message, Form } from "antd";
import { CustomAxiosPost } from "../../../Functions/CustomAxios";

const AppDetailsAdd = (props) => {
  return (
    <>
      <div className="ApplicationsBox">
        <Form
          onFinish={(values) => {
            console.log(values);
            CustomAxiosPost(
              `/v1/admins/${localStorage.getItem("adminId")}/applications`,
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
              <h2>세부</h2>
            </span>
          </div>

          {/* <Form.Item
            className="inputBox"
            label="Integration key"
            name="integrationKey"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="DIGHW6U9B6980J7KRZRB" />
            <button className="select" type="button">
              select
            </button>
          </Form.Item> */}
          <Form.Item
            className="inputBox"
            label="Name"
            name="secretKey"
            labelCol={{ span: 3 }}
            labelAlign="left"
          >
            <input placeholder="Click to view." />
            <button className="select" type="button">
              중복체크
            </button>
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
            // onClick={() => {
            //   props.setApplications(true);
            //   message.success("추가되었습니다.");
            // }}
            type="submit"
            onClick={() => {
              props.setApplicationsAdd(false);
              props.setApplications(true);
            }}
          >
            저장
          </button>
        </Form>
      </div>
    </>
  );
};

export default AppDetailsAdd;
