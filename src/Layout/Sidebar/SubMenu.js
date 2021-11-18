import React from 'react';
import MenuItem from './Menu_Item';
import './SubMenu.css'

const SubMenu = ({data, open}) => {
    return <>
        <div className={"submenu " + (open ? 'open' : 'close')}>
            {
                data.map(item => <MenuItem {...item}/>)
            }
        </div>
    </>
}

export default SubMenu;