import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

const ContentsTitle = ({ title }) => {
  return (
    <>
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
