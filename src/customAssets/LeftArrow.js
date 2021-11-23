import React from 'react';
import './Arrow.css'

const LeftArrow = ({onClick, disabled}) => {
    return <div className={"custom-arrow left" + (disabled ? ' disabled' : '')} onClick={() => {
        if(onClick && !disabled) onClick();
    }}><div/></div>
}

export default LeftArrow;