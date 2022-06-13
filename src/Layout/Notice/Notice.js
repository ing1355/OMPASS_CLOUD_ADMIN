import React, { useCallback, useRef } from "react";
import "./Notice.css";
import { useCookies } from 'react-cookie'
import { FormattedMessage } from "react-intl";

const Notice = ({ content, noticeId, setDisplay }) => {
  const noticeRef = useRef(null);
  const [cookies, setCookie, removeCookie] = useCookies()

  const closeNotice = useCallback(() => {
    setDisplay(null)
  }, []);

  const noReplyFunc = () => {
    setCookie('noticeId', noticeId)
  }

  return <div className="notice-mask-container" ref={noticeRef}>
    <div className="notice-contents-container">
      <div className="notice-container">
        <div className="notice-title-container">
          <h2><FormattedMessage id="Notices"/></h2>
          <div className="notice-close-icon-container">
            <button onClick={closeNotice}>X</button>
          </div>
        </div>
        <div className="notice-content-container">
          <div className="notice-content">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
          <div className="no-reply-show-container">
            <FormattedMessage id="Notice-No-Reply"/>{" "}
            <button
              className="no-reply-show-text"
              onClick={(e) => {
                noReplyFunc();
                closeNotice();
              }}
            >
              X
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Notice;
