import React, { useCallback, useLayoutEffect, useState } from 'react';
import './Notice.css'

const Notice = () => {
    const [visible, setVisible] = useState(true);
    const [contentsLoad, setContentsLoad] = useState(false);

    const closeNotice = useCallback(() => {
        setVisible(false);
    }, [])

    useLayoutEffect(() => {
        if (visible) {
            setTimeout(() => {
                setContentsLoad(true);
            }, 500);
        }
    }, [visible])

    return (
        visible && <div className="notice-mask-container">
            <div className="notice-contents-container">
                <div className="notice-container">
                    <div className="notice-title-container">
                        <h2>공지사항</h2>
                        <div className="notice-close-icon-container" onClick={closeNotice}>
                            X
                        </div>
                    </div>
                    <div className="notice-content" style={{maxHeight: contentsLoad ? 1000 : 0}}>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                        testtesttesttesttesttesttesttes<br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice;