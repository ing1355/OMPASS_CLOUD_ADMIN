import React from 'react';
import './CustomSwitch.css'

const CustomSwitch = ({checked, onChange, defaultChecked}) => {
    return <>
        <input type="checkbox" id="customSwitch" className="input__on-off" defaultChecked={defaultChecked} checked={checked} onChange={onChange}/>
        <label htmlFor="customSwitch" className="label__on-off">
            <span className="marble"></span>
            <span className="on">on</span>
            <span className="off">off</span>
        </label>
    </>
}

export default CustomSwitch;