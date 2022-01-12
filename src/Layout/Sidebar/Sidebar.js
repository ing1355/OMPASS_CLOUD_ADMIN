import React from "react";
import Menu from "./Menu";
import "./Sidebar.css";
import { ImportOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

const Sidebar = ({locale}) => {
  return (
    <div className="sidebar">
      <Menu />
      <a
        className="back-to-homepage"
        href={locale === 'ko' ? "https://ompass.kr:4003/ko" : "https://ompass.kr:4003"}
        target="_blank"
      >
        <ImportOutlined style={{marginRight:'6px'}}/>
          <FormattedMessage id="BACKHOMEPAGE"/>
      </a>
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
