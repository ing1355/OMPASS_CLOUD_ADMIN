import React from 'react';
import './Arrow.css'

const RightArrow = ({onClick, disabled}) => {
    return <div className={"custom-arrow right" + (disabled ? ' disabled' : '')} onClick={() => {
        if(onClick && !disabled) onClick();
    }}><div/></div>
}

export default RightArrow;