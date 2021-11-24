import React from 'react';
import './CustomButton.css'

const CustomButton = ({className, onClick, disabled, loading, type, children}) => {
    return <button className={"custom-button" + (className ? (' ' + className) : '')} onClick={() => {
        if(onClick && !loading) onClick();
    }} disabled={disabled} type={type}>
        {loading && <div className="loading-container"><div className="loading"/></div>}
        {children}
    </button>
}

export default CustomButton;