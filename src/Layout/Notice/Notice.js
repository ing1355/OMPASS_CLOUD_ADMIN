import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import './Notice.css'

const Notice = (props) => {
    const { content, noReplyFunc } = props
    const [contentsLoad, setContentsLoad] = useState(false);
    const noticeRef = useRef(null)

    const closeNotice = useCallback(() => {
        noticeRef.current.remove()
    }, [])

    useLayoutEffect(() => {
        setTimeout(() => {
            setContentsLoad(true);
        }, 500);
    }, [])

    return (
        <div className="notice-mask-container" ref={noticeRef}>
            <div className="notice-contents-container">
                <div className="notice-container">
                    <div className="notice-title-container">
                        <h2>공지사항</h2>
                        <div className="notice-close-icon-container" onClick={closeNotice}>
                            X
                        </div>
                    </div>
                    <div className="notice-content-container" style={{ maxHeight: contentsLoad ? 'calc(100% - 60px)' : 0 }}>
                        <div className="notice-content">
                            {content}
                        </div>
                        <div className="no-reply-show-container">
                            <span className="no-reply-show-text" onClick={(e) => {
                                noReplyFunc()
                                closeNotice()
                            }}>
                                다신 이 공지를 보지 않겠습니다
                        </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice;