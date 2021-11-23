import React from 'react';
import './Arrow.css'

const DoubleRightArrow = ({onClick, disabled}) => {
    return <div className={"custom-double-arrow-container right" + (disabled ? ' disabled' : '')} onClick={() => {
        if(onClick && !disabled) onClick();
    }}><div/><div/></div>
}

export default DoubleRightArrow