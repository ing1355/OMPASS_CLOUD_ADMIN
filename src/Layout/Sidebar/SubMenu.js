import React from 'react';
import MenuItem from './Menu_Item';
import './SubMenu.css'

const SubMenu = ({data, open}) => {
    return <>
        <div className={"submenu " + (open ? 'open' : 'close')} style={{
            height: open ? data.length * 60 : 0
        }}>
            {
                data.map((item, ind) => <MenuItem key={ind} isSubmenu {...item}/>)
            }
        </div>
    </>
}

export default SubMenu;