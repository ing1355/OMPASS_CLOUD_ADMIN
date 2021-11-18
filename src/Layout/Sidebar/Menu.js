import React, { useEffect } from 'react';
import './Menu.css'
import MenuItem from './Menu_Item';
import Menu_Items from './Menu_Items';

const Menu = (props) => {
    useEffect(() => {
        console.log(props);
    },[])
    return (
        <div className="menu">
            {Menu_Items.map(item =>
                <MenuItem {...item} />
            )}
        </div>
    )
}

export default Menu;