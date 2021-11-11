import React from "react";
import "./Policies.css";
import ContentsTitle from "../ContentsTitle";
import "../../../App.css";
const Policies = () => {
  return (
    <>
      <ContentsTitle />
      <div className="PoliciesBox">
        <div className="PoliciesTitleBox">
          {" "}
          <p>
            Duo's policy engine gives you the ability to control how your users
            authenticate, from where, using which types of devices. Policies can
            be defined system-wide, per application, or for specific groups.
          </p>
          <button>Policy</button>
        </div>

        <table>
          <tr>
            <th> Enabled </th>
            <td>New User policy</td>{" "}
            <td> Prompt unenrolled users to enroll whenever possible.</td>
          </tr>
          <tr>
            <th></th>
            <td> Authentication policy</td>{" "}
            <td>
              Require two-factor authentication or enrollment when applicable,
              unless there is a superseding policy configured.
            </td>
          </tr>
          <tr>
            <th></th>
            <td> User location</td> <td>No restrictions.</td>
          </tr>
          <tr>
            <th></th>
            <td> Device Health application</td>{" "}
            <td> Don't require users to have the app</td>
          </tr>
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>
          <tr>
            <th></th>
            <td> Operating systems</td> <td> No restrictions.</td>
          </tr>
          <tr>
            <th></th>
            <td> Plugins</td> <td>No restrictions.</td>
          </tr>{" "}
          <tr>
            <th> Enabled </th>
            <td>Authentication methods</td>{" "}
            <td> Prompt unenrolled users to enroll whenever possible.</td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>{" "}
          <tr>
            <th></th>
            <td> Remembered devices</td>{" "}
            <td>
              Do not remember devices for browser-based applications. Do not
              remember devices for Windows Logon.
            </td>
          </tr>
        </table>
        <div className="PoliciesBottomBox">
          <h5>Custom Policies</h5>
          <p>
            To enforce different policies on different applications, create a
            custom policy and assign it to those applications. Policy settings
            in a custom policy will override anything set in the global policy.
          </p>
          <button>Policy</button>
        </div>
      </div>
    </>
  );
};

export default Policies;
