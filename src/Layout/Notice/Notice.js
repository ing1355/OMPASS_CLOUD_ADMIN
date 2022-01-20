import React, { useCallback, useState } from 'react';
import './Notice.css'

const Notice = () => {
    const [visible, setVisible] = useState(true);

    const closeNotice = useCallback(() => {
        setVisible(false);
    }, [])
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
                    <div className="notice-content">
                        testtesttesttesttesttesttesttes
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notice;