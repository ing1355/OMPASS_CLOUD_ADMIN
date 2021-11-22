import React from "react";
import { Form } from "antd";
import "../Billing/Billing.css";
import "./Users.css";
import { Redirect, useParams } from "react-router";
const UserDetail = ({ data }) => {
  const { id } = useParams();
  const labelColSpan = 4;
  console.log(data);
  return (
    <>
      {
        !data ? <Redirect to="/Users" />
          : <div className="ApplicationsBox">
            <div className="billing-change-help-container">
              <div className="billing-change-help-icon"/>
              <div className="billing-change-help-msg">
                평가판이 종료되면 최대 10명의 사용자에게 항상 무료로 제공되는 OMPASS
                Free로 전환됩니다. 아래 양식을 사용하여 다른 버전으로 변경하십시오.
              </div>
            </div>
            <Form
              onFinish={(values) => {
                console.log("finish!!", values);
              }}
            >
              <Form.Item
                className="inputBox"
                label="Username"
                name="integrationKey"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
                
              >
                <input />
              </Form.Item>

              <div className="ant-row inputBox ant-form-item">
                <div className="ant-col-4 ant-form-item-label-left">
                  <label>
                    + Add a username alias
                  </label>
                </div>
                <div className="ant-col ant-form-item-control">
                  <p className="userdetailP">Users can have up to 8 aliases.</p>
                  <p className="userdetailP">
                    Optionally, you may choose to reserve using an alias number for a
                    specific alias
                </p>
                  <p className="userdetailP">
                    (e.g., Username alias 1 should only be used for Employee ID)
                </p>
                </div>
              </div>

              <Form.Item
                className="inputBox"
                label="Full name"
                name="Full name"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <input />
              </Form.Item>
              <Form.Item
                className="inputBox"
                label="Email"
                name="Email"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <input />
              </Form.Item>
              <Form.Item
                className="inputBox userDetailInputBox"
                label="Status"
                name="Status"
                initialValue='active'
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <div>
                  <input className="userDetailInput" type="radio" name="check" value="active" defaultChecked />
                  <label className="label">Active</label>
                  <p>Require two-factor authentication (default)</p>
                  <input className="userDetailInput" type="radio" name="check" value="bypass" />
                  <label className="label">Bypass</label>
                  <p>Skip two-factor authentication</p>
                  <input className="userDetailInput" type="radio" name="check" value="disabled" />
                  <label className="label"> Disabled</label>
                  <p>Automatically deny access</p>
                </div>
              </Form.Item>

              <Form.Item
                className="inputBox"
                label="Notes"
                name="Notes"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <input />
              </Form.Item>
              <Form.Item
                className="inputBox"
                label="Created"
                name="Created"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <p className="userdetailP">Nov 19, 2021 6:09 AM (UTC)</p>
              </Form.Item>
              <Form.Item
                className="inputBox"
                label="Last login"
                name="Last login"
                labelCol={{ span: labelColSpan }}
                labelAlign="left"
              >
                <p className="userdetailP">Never authenticated</p>
              </Form.Item>
              <div className="ApplicationsTitle">
                <h2>정책</h2>
                <p>
                  정책은 사용자가 이 애플리케이션에 액세스할 때 인증하는 시기와
                  방법을 정의합니다.<br />
                  글로벌 정책은 항상 적용되지만 사용자 지정 정책으로 해당 규칙을
                  재정의할 수 있습니다.
                </p>
              </div>

              <button className="ApplicationsSave" type="submit">
                저장
              </button>
            </Form>
          </div>
      }

    </>
  );
};

export default UserDetail;
