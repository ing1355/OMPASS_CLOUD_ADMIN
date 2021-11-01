import React from 'react';
import Menu_Item from './Menu_Item';
import './SubMenu.css'

const SubMenu = ({data, open}) => {
    return <>
        <div className={"submenu " + (open ? 'open' : 'close')}>
            {
                data.map(item => <Menu_Item {...item}/>)
            }
        </div>
    </>
}

export default SubMenu;