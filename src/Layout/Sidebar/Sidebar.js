import React from "react";
import Menu from "./Menu";
import "./Sidebar.css";
import { ImportOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

const Sidebar = ({ locale }) => {
  const domain = process.env.REACT_APP_SERVICE_TARGET === 'aws' ? 'https://ompasscloud.com' : (locale === 'ko' ? 'https://ompass.kr:4003/ko' : 'https://ompass.kr:4003')
  return (
    <div className="sidebar">
      <Menu />
      <a
        className="back-to-homepage"
        rel="noopener noreferrer"
        href={domain}
        target="_blank"
      >
        <ImportOutlined style={{ marginRight: "6px" }} />
        <FormattedMessage id="BACKHOMEPAGE" />
      </a>
      {/* <a className="user-Withdrawal">회원 탈퇴</a> */}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    locale: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
