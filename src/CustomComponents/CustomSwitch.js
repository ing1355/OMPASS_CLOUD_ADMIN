import React from 'react';
import './CustomSwitch.css'

const CustomSwitch = ({checked, disabled, onChange}) => {
    return <>
        <input type="checkbox" id="customSwitch" className="input__on-off" checked={checked} readOnly={true} onChange={e => {
            if(onChange) onChange(e.target.checked)
        }}/>
        <label htmlFor="customSwitch" className="label__on-off">
            <span className="marble"></span>
            <span className="on">on</span>
            <span className="off">off</span>
        </label>
    </>
}

export default CustomSwitch;