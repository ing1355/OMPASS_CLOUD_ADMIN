import React from 'react';
import './CustomSwitch.css'

const CustomSwitch = ({checked, onChange, defaultChecked, disabled}) => {
    return <>
        <input type="checkbox" id="customSwitch" className="input__on-off" defaultChecked={defaultChecked} disabled={disabled} checked={checked} onChange={onChange}/>
        <label htmlFor="customSwitch" className="label__on-off">
            <span className="marble"></span>
            <span className="on">on</span>
            <span className="off">off</span>
        </label>
    </>
}

export default CustomSwitch;