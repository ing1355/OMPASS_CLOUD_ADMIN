import React from 'react';
import Brand from './Brand';
import './Header.css'
import HeaderContents from './HeaderContents';

const Header = () => {
    return (
        <div className="header">
            <Brand />
            <HeaderContents/>
        </div>
    )
}

export default Header;