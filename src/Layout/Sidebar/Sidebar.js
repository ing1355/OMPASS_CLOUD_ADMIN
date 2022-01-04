import React from "react";
import Menu from "./Menu";
import "./Sidebar.css";
import { ImportOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Menu />
      <a
        className="back-to-homepage"
        href="https://ompass.kr:4003"
        target="_blank"
      >
        <ImportOutlined style={{marginRight:'6px'}}/>
          <FormattedMessage id="BACKHOMEPAGE"/>
      </a>
    </div>
  );
};

export default Sidebar;
