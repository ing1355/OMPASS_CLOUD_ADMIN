import React, { useEffect } from 'react';
import Menu from './Menu';
import './Sidebar.css'

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Menu/>
            <a className="back-to-homepage" href="https://ompass.kr:4003">
                홈페이지로 돌아가기
            </a>
        </div>
    )
}

export default Sidebar;