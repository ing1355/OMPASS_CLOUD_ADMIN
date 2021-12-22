import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Breadcrumb from "../../CustomComponents/Breadcrumb";

const ContentsTitle = ({ title }) => {
  return (
    <>
      {/* <Breadcrumb /> */}
      <h1 className="contents-container-title"><FormattedMessage id={title}/></h1>
    </>
  );
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentsTitle);
