import React from 'react';
import './Menu.css'
import Menu_Item from './Menu_Item';
import Menu_Items from './Menu_Items';

const Menu = () => {
    return (
        <div className="menu">
            {Menu_Items.map(item =>
                <Menu_Item {...item} />
            )}
        </div>
    )
}

export default Menu;