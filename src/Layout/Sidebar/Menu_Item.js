import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./Menu_Item.css";
import downArrow from "../../assets/downArrow.png";
import upArrow from "../../assets/upArrow.png";
import SubMenu from "./SubMenu";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Menu_Item = ({ name, menuState, submenu, menuChange, route, icon, isSubmenu }) => {
  const navigate = useNavigate();
  const isSelected = useMemo(() => submenu ? submenu.find((sb) => sb.name === menuState) || name === menuState
    : name === menuState
    , [submenu, menuState, name]);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  
  useLayoutEffect(() => {
    if (isSelected && !subMenuOpen) setSubMenuOpen(true);
  }, [isSelected, subMenuOpen])

  useEffect(() => {
    if (
      submenu &&
      !(submenu.find((sb) => sb.name === menuState) || name === menuState) &&
      subMenuOpen
    )
      setSubMenuOpen(false);
  }, [menuState, submenu, subMenuOpen, name]);

  const menuClickEvent = () => {
    if (submenu) {
      if (subMenuOpen) {
        setSubMenuOpen(false);
      } else {
        if (!submenu.find(sb => sb.name === menuState)) {
          menuChange(submenu[0].name)
          navigate(submenu[0].route.endsWith('*') ? submenu[0].route.slice(0, -2) : submenu[0].route)
        }
        setSubMenuOpen(true);
      }
    } else {
      menuChange(name);
      if (subMenuOpen) {
        setSubMenuOpen(false);
      } else {
        setSubMenuOpen(true);
      }
    }
  };

  const children = <>
    <div
      className={(isSubmenu ? "submenu-item" : "menu-item") + " pointer" + (isSelected ? " selected" : "")}
      onClick={menuClickEvent}
    >
      <div className="menu-item-title">
        {icon} &nbsp;<FormattedMessage id={name} />
      </div>
      {submenu && (
        <img
          src={isSelected && subMenuOpen ? upArrow : downArrow}
          className="menu-item-arrow"
          alt=""
        />
      )}
    </div>
    { submenu && <SubMenu data={submenu} open={subMenuOpen} />}
  </>

  return (
    !submenu ? <Link to={route.endsWith('*') ? route.slice(0, -2) : route}>
      {children}
    </Link> : children
  );
};

function mapStateToProps(state) {
  return {
    menuState: state.menuState,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    menuChange: (toggle) => {
      dispatch(ActionCreators.menuStateChange(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu_Item);
