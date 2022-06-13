import React from "react";
import Menu from "./Menu";
import "./Sidebar.css";
import { ImportOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";
import { connect, useSelector } from "react-redux";

const Sidebar = ({ locale }) => {
  const domain = process.env.REACT_APP_SERVICE_TARGET === 'aws' ? 'https://ompasscloud.com' : (locale === 'ko' ? 'https://ompass.kr:4003/ko' : 'https://ompass.kr:4003')
  const {standalone} = useSelector(state => ({
    standalone: state.standalone
  }))
  return (
    <div className={"sidebar" + (standalone.standalone ? ' standalone' : '')}>
      <Menu />
      <a
        className="back-to-homepage"
        rel="noopener noreferrer"
        href={standalone.standalone ? '/docs' : domain}
        target="_blank"
      >
        <ImportOutlined style={{ marginRight: "6px" }} />
        <FormattedMessage id={standalone.standalone ? "GODOCUMENT" : "BACKHOMEPAGE"} />
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
