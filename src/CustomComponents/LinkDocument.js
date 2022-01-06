import React from 'react'
import { connect } from "react-redux";

const LinkDocument = ({locale, link}) => {
    return <div className="document-link">
        {locale === "ko" ? (
            <>
                <a
                    target="_blank"
                    href={"https://ompass.kr:4003/ko" + link}
                >
                    <b>문서로 이동하기</b>
                </a>
            </>
        ) : (
            <>
                <a target="_blank" href={"https://ompass.kr:4003" + link}>
                    <b>Go Document</b>
        </a>
            </>
        )}
    </div>
}

function mapStateToProps(state) {
    return {
        locale: state.locale,
    };
  }
  
  function mapDispatchToProps(dispatch) {
    return {
    };
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(LinkDocument);