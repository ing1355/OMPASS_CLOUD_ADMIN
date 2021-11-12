import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ActionCreators from '../../redux/actions';
import './Menu_Item.css'
import downArrow from '../../assets/downArrow.png'
import upArrow from '../../assets/upArrow.png'
import SubMenu from './SubMenu';
import { useHistory } from 'react-router';

const Menu_Item = ({name, menuState, submenu, menuChange, route}) => {
    const isSelected = submenu ? (submenu.find(sb => sb.name === menuState) || name === menuState) : route === window.location.pathname;
    const [subMenuOpen, setSubMenuOpen] = useState(isSelected);

    const history = useHistory();

    useEffect(() => {
        if(submenu && !(submenu.find(sb => sb.name === menuState) || name === menuState) && subMenuOpen) setSubMenuOpen(false);
    },[menuState])

    const menuClickEvent = () => {
        if(submenu) {
            if(subMenuOpen) {
                setSubMenuOpen(false);
            } else {
                setSubMenuOpen(true);
            }
        } else {
            history.push(route)
            menuChange(name);
            if(subMenuOpen) {
                setSubMenuOpen(false);
            } else {
                setSubMenuOpen(true);
            }
        }
    }

    return <>
        <div className={"menu-item pointer " + (isSelected ? 'selected' : '')} onClick={menuClickEvent}>
            <div className="menu-item-title">{name}</div>
            {submenu && <img src={isSelected && subMenuOpen ? upArrow : downArrow} className="menu-item-arrow"/>}
        </div>
        {submenu && <SubMenu data={submenu} open={subMenuOpen}/>}
    </>
}

function mapStateToProps(state) {
    return {
        menuState: state.menuState
    }
}

function mapDispatchToProps(dispatch) {
    return {
        menuChange: toggle => {
            dispatch(ActionCreators.menuStateChange(toggle));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu_Item);