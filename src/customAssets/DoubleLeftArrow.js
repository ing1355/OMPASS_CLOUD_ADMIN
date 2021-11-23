import React from 'react';
import './Arrow.css'

const DoubleLeftArrow = ({onClick, disabled}) => {
    return <div className={"custom-double-arrow-container left" + (disabled ? ' disabled' : '')} onClick={() => {
        if(onClick && !disabled) onClick();
    }}><div/><div/></div>
}

export default DoubleLeftArrow