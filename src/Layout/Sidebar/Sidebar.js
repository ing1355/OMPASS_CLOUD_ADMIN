import React, { useEffect } from "react";
import Menu from "./Menu";
import "./Sidebar.css";
import { ImportOutlined } from "@ant-design/icons";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Menu />
      <a
        className="back-to-homepage"
        href="https://ompass.kr:4003"
        target="_blank"
      >
        <ImportOutlined />
        &nbsp;&nbsp;홈페이지로 돌아가기
      </a>
    </div>
  );
};

export default Sidebar;
