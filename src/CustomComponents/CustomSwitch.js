import React from 'react';
import './CustomSwitch.css'

const CustomSwitch = ({defaultChecked, disabled}) => {
    return <>
        <input type="checkbox" id="customSwitch" className="input__on-off" defaultChecked={defaultChecked} disabled={disabled}/>
        <label htmlFor="customSwitch" className="label__on-off">
            <span className="marble"></span>
            <span className="on">on</span>
            <span className="off">off</span>
        </label>
    </>
}

export default CustomSwitch;