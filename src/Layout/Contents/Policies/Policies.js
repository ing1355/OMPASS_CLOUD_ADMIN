import React, { useState } from "react";
import "./Policies.css";
import "../../OMSRole/Policies.css";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
import { Drawer, Space } from "antd";
import CustomButton from "../../../CustomComponents/CustomButton";

const policies = [{ name: "Users", items: [{ name: "New User policy" }] }];

const Policies = () => {
  const [editDrawerOpen, setEditDrawerOpen] = useState(false);
  return (
    // <div
    //   className="contents-container"
    //   style={{ position: "relative", overflow: "hidden" }}
    // >
    //   <Drawer
    //     title={
    //       <div
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //           alignItems: "center",
    //         }}
    //       >
    //         <div>test</div>
    //         <Space>
    //           <button className="button">기본값으로 변경</button>
    //           <button
    //             className="button"
    //             onClick={() => {
    //               setEditDrawerOpen(false);
    //             }}
    //           >
    //             닫기
    //           </button>
    //         </Space>
    //       </div>
    //     }
    //     visible={editDrawerOpen}
    //     closable={false}
    //     getContainer={false}
    //     placement="right"
    //     style={{ position: "absolute" }}
    //     bodyStyle={{ paddingBottom: 80 }}
    //     destroyOnClose
    //     width={900}
    //   >
    //     test
    //   </Drawer>
    //   <ContentsTitle />
    //   <div className="PoliciesBox">
    //     <div className="PoliciesTitleBox">
    //       <p>
    //         Duo's policy engine gives you the ability to control how your users
    //         authenticate, from where, using which types of devices. Policies can
    //         be defined system-wide, per application, or for specific groups.
    //       </p>
    //       <button
    //         className="button"
    //         onClick={() => {
    //           setEditDrawerOpen(true);
    //         }}
    //       >
    //         Edit Global Policy
    //       </button>
    //     </div>

    //     <table>
    //       <tbody>
    //         <tr>
    //           <th>Enabled</th>
    //           <td>New User policy</td>
    //           <td>Prompt unenrolled users to enroll whenever possible.</td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Authentication policy</td>
    //           <td>
    //             Require two-factor authentication or enrollment when applicable,
    //             unless there is a superseding policy configured.
    //           </td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>User location</td>
    //           <td>No restrictions.</td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Device Health application</td>
    //           <td>Don't require users to have the app</td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Remembered devices</td>
    //           <td>
    //             Do not remember devices for browser-based applications. Do not
    //             remember devices for Windows Logon.
    //           </td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Operating systems</td>
    //           <td>No restrictions.</td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Plugins</td>
    //           <td>No restrictions.</td>
    //         </tr>
    //         <tr>
    //           <th>Enabled</th>
    //           <td>Authentication methods</td>
    //           <td>Prompt unenrolled users to enroll whenever possible.</td>
    //         </tr>
    //         <tr>
    //           <th></th>
    //           <td>Remembered devices</td>
    //           <td>
    //             Do not remember devices for browser-based applications. Do not
    //             remember devices for Windows Logon.
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //     <div className="PoliciesBottomBox">
    //       <h5>Custom Policies</h5>
    //       <p>
    //         To enforce different policies on different applications, create a
    //         custom policy and assign it to those applications. Policy settings
    //         in a custom policy will override anything set in the global policy.
    //       </p>
    //       <button
    //         className="button"
    //         onClick={() => {
    //           setEditDrawerOpen(true);
    //         }}
    //       >
    //         New Policy
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="contents-container">
      <section className="policies-box">
        <h2>Authentication policy</h2>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">2차 인증 필수</label>
          <p>
            Requir two-factor authentication or enrollment when applicable,
            unless there is a superseding policy configured.
          </p>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">2차 인증 패스</label>
          <p>
            Skip two-factor athentication and enrollment, unless there is a
            superseding pollcy configured.
          </p>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">모두 거부</label>
          <p>Deny authentication to all users..</p>
        </div>
      </section>

      <section className="policies-box">
        <h2>User location</h2>
        <div className="policies-sub-box">
          <h3>
            OMPASS will do a country lookup on the host IP address and can apply
            actions based on the country.
          </h3>
          <div>
            <input className="userlocation-first" />
            <select name="order">
              <option selected disabled>
                No action
              </option>
              <option value="1">dddddddddd</option>
              <option value="2-10">ddddddddd</option>
            </select>
          </div>
          <div>
            <input className="userlocation-first" />
            <select name="order">
              <option selected disabled>
                No action
              </option>
              <option value="1">dddddddddd</option>
              <option value="2-10">ddddddddd</option>
            </select>
          </div>
        </div>
      </section>

      <section className="policies-box">
        <h2>Browsers</h2>
        <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
          Always block
        </div>

        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Chrome</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Chrome Mobile</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Edge</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Firefox</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Internet Explorer</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Mobile Safari</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Safari</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">All other browsers</label>
        </div>
      </section>

      <section className="policies-box authorized-networks">
        <h2>Authorized networks</h2>
        <div className="policies-sub-box">
          <h3>
            Specify networks using a comma-separated list of OP addresses, IP
            ranges, or CIDRs. These must be oublic IP addresses, and not local
            or pivate IP addresses.
          </h3>
          <h4>Your IP address is 61.81.118.201</h4>
          <h3>Allow access without 2FA from these networks:</h3>
          <div>
            <input className="userlocation-first" />
          </div>
          <div className="policies-sub-box no-left-box">
            <input
              name="status"
              value="Inactive"
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">
              Require enrollment from these networks.
            </label>
            <p>
              If checked, unenrolled users will be subhect to the new user
              policy, even if the login is from one of the IP addresses
              specified above.
            </p>
          </div>

          <h3>Require 2FA from these networks:</h3>
          <div>
            <input className="userlocation-first" />
          </div>
          <div className="policies-sub-box no-left-box">
            <input
              name="status"
              value="Inactive"
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">
              Deny access from all other networks.
            </label>
          </div>
        </div>
      </section>

      <section className="policies-box">
        <h2>Authentication methods</h2>
        <div className="policies-sub-box" style={{ fontWeight: "bold" }}>
          Users will only be allowed to authenticate with 2FA ising the checked
          methods.
        </div>

        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">OMPASS Push</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">OMPASS Mobile passcodes</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">SMS passcodes</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Security keys (U2F)</label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">WebAuthn</label>
          <div style={{ marginLeft: "0.5rem" }} className="policies-sub-box">
            <input
              name="status"
              value="Inactive"
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">Security Keys(WebAuthn)</label>
          </div>
          <div style={{ marginLeft: "0.5rem" }} className="policies-sub-box">
            <input
              name="status"
              value="Inactive"
              type="radio"
              style={{ width: "15px" }}
            />
            <label className="label-radio">Touch ID</label>
          </div>
        </div>

        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">Hardware tokens</label>
        </div>
      </section>

      <section className="policies-box">
        <h2>OMPASS Mobile app</h2>

        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">
            Require up-to-date securitu patches for OMPASS Mobile.
          </label>
        </div>
        <div className="policies-sub-box">
          <input
            name="status"
            value="Inactive"
            type="radio"
            style={{ width: "15px" }}
          />
          <label className="label-radio">
            Don't require up-to-date security patches for OMPASS Mobile.
          </label>
          <p>Only applies to iOS AND aNDROID.</p>
        </div>
      </section>
      <CustomButton className="button">Save Policy</CustomButton>
    </div>
  );
};

export default Policies;
