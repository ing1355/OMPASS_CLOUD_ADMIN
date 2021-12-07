import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import "./Menu_Item.css";
import downArrow from "../../assets/downArrow.png";
import upArrow from "../../assets/upArrow.png";
import SubMenu from "./SubMenu";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const Menu_Item = ({ name, menuState, submenu, menuChange, route }) => {
  const isSelected = submenu
    ? (submenu.find((sb) => sb.name === menuState) || name === menuState)
    : name === menuState;
  const [subMenuOpen, setSubMenuOpen] = useState(isSelected);

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
  
  return (
    <Link to={route}>
      <div
        className={"menu-item pointer " + (isSelected ? "selected" : "")}
        onClick={menuClickEvent}
      >
        <div className="menu-item-title"><FormattedMessage id={name}/></div>
        {submenu && (
          <img
            src={isSelected && subMenuOpen ? upArrow : downArrow}
            className="menu-item-arrow"
            alt=""
          />
        )}
      </div>
      {submenu && <SubMenu data={submenu} open={subMenuOpen} />}
    </Link>
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
