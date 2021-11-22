import React from "react";
import { Form } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { useParams } from "react-router";
const UserDetail = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <div className="ApplicationsBox">
        <div className="billing-change-help-container">
          <div className="billing-change-help-icon">test</div>
          <div className="billing-change-help-msg">
            평가판이 종료되면 최대 10명의 사용자에게 항상 무료로 제공되는 OMPASS
            Free로 전환됩니다. 아래 양식을 사용하여 다른 버전으로 변경하십시오.
          </div>
        </div>
        <Form
          onFinish={() => {
            console.log("finish!!");
          }}
        >
          <Form.Item
            className="inputBox"
            label="Username"
            name="integrationKey"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
              {
                pattern: /^[0-9]/g,
                message: "testtest",
              },
              {
                pattern: /^[A-Z]/g,
                message: "testtest",
              },
            ]}
          >
            <input />
          </Form.Item>

          <Form.Item
            className="inputBox"
            label="Username aliases"
            name="Username aliases"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "",
              },
            ]}
          >
            <p className="userdetailA userdetailP">
              +
              <b style={{ textDecoration: "underline" }}>
                Add a username alias
              </b>
            </p>
            <p className="userdetailP">Users can have up to 8 aliases.</p>
            <p className="userdetailP">
              Optionally, you may choose to reserve using an alias number for a
              specific alias
            </p>
            <p className="userdetailP">
              (e.g., Username alias 1 should only be used for Employee ID)
            </p>
          </Form.Item>

          <Form.Item
            className="inputBox"
            label="Full name"
            name="Full name"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <input />
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Email"
            name="Email"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <input />
          </Form.Item>
          <Form.Item
            className="inputBox userDetailInputBox"
            label="Status"
            name="Status"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <div>
              <input className="userDetailInput" type="checkbox" name="check" />
              <label className="label">Active</label>
              <p>Require two-factor authentication (default)</p>
            </div>
            <div>
              <input className="userDetailInput" type="checkbox" name="check" />
              <label className="label">Bypass</label>
              <p>Skip two-factor authentication</p>
            </div>
            <div>
              <input className="userDetailInput" type="checkbox" name="check" />
              <label className="label"> Disabled</label>
              <p>Automatically deny access</p>
            </div>
            {/* <span>
              This controls the user's two-factor authentication process.
            </span> */}
          </Form.Item>

          <Form.Item
            className="inputBox"
            label="Notes"
            name="Notes"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <input />
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Created"
            name="Created"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <p className="userdetailP">Nov 19, 2021 6:09 AM (UTC)</p>
          </Form.Item>
          <Form.Item
            className="inputBox"
            label="Last login"
            name="Last login"
            labelCol={{ span: 3 }}
            labelAlign="left"
            rules={[
              {
                required: true,
                message: "이름을 입력해주세요.",
              },
            ]}
          >
            <p className="userdetailP">Never authenticated</p>
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

          <button className="ApplicationsSave" type="submit">
            저장
          </button>
        </Form>
      </div>
    </>
  );
};

export default UserDetail;
