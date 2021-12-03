/* eslint-disable no-undef */
import React, { useState, useEffect } from "react";
import "./Policies.css";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import { Drawer, Space } from "antd";
import GlobalPolicy from "./Global_Policy";
import NewPolicy from "./New_Policy";

const policies = [{ name: "Users", items: [{ name: "New User policy" }] }];

const Policies = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  const [newPolicy_editDrawerOpen, setNewPolicy_editDrawerOpen] =
    useState(false);
  const TopButton = () => {
    window.scrollTo(0, 0);
  };
  return (
    <div
      className="contents-container"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <Drawer
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Edit Global Policy</div>
            <Space>
              <button className="button">저장</button>
              <button
                className="button"
                onClick={() => {
                  setEditDrawerOpen(false);
                }}
              >
                닫기
              </button>
            </Space>
          </div>
        }
        visible={editDrawerOpen}
        closable={false}
        getContainer={false}
        placement="right"
        style={{ position: "absolute" }}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        width={900}
      >
        <div>{editDrawerOpen === true ? <GlobalPolicy /> : null}</div>
      </Drawer>

      <Drawer
        title={
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>Custom Policies</div>
            <Space>
              <button className="button">저장</button>
              <button
                className="button"
                onClick={() => {
                  setNewPolicy_editDrawerOpen(false);
                }}
              >
                닫기
              </button>
            </Space>
          </div>
        }
        visible={newPolicy_editDrawerOpen}
        closable={false}
        getContainer={false}
        placement="right"
        style={{ position: "absolute" }}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose
        width={900}
      >
        <div>{newPolicy_editDrawerOpen === true ? <NewPolicy /> : null}</div>
      </Drawer>

      <ContentsTitle />
      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          <p>
            Duo's policy engine gives you the ability to control how your users
            authenticate, from where, using which types of devices. Policies can
            be defined system-wide, per application, or for specific groups.
          </p>
          <button
            className="button"
            onClick={() => {
              setEditDrawerOpen(true);
            }}
          >
            Edit Global Policy
          </button>
        </div>

        <table>
          <tbody>
            <tr>
              <th style={{ color: "#000" }}>Enabled</th>
              <td>New User policy</td>
              <td>Prompt unenrolled users to enroll whenever possible.</td>
            </tr>
            <tr>
              <th></th>
              <td>Authentication policy</td>
              <td>
                Require two-factor authentication or enrollment when applicable,
                unless there is a superseding policy configured.
              </td>
            </tr>
            <tr>
              <th></th>
              <td>User location</td>
              <td>No restrictions.</td>
            </tr>
            <tr>
              <th></th>
              <td>Browsersn</td>
              <td>Don't require users to have the app</td>
            </tr>
            <tr>
              <th></th>
              <td>Authorized networks</td>
              <td>
                Do not remember devices for browser-based applications. Do not
                remember devices for Windows Logon.
              </td>
            </tr>
            <tr>
              <th></th>
              <td>Authentication methods</td>
              <td>No restrictions.</td>
            </tr>
            <tr>
              <th>OMPASS Mobile app</th>
              <td>Plugins</td>
              <td>No restrictions.</td>
            </tr>
          </tbody>
        </table>
        <div className="PoliciesBottomBox">
          <h5>Custom Policies</h5>
          <p>
            To enforce different policies on different applications, create a
            custom policy and assign it to those applications. Policy settings
            in a custom policy will override anything set in the global policy.
          </p>
          <button
            className="button"
            onClick={() => {
              setNewPolicy_editDrawerOpen(true);
            }}
          >
            New Policy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Policies;
