import React, { useLayoutEffect } from "react";
import "./Contents.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect } from "react-redux";
import Chat from "../../CustomComponents/Chat";
import ActionCreators from "../../redux/actions";
import route_info from "../../Constants/Route_items";

const Contents = ({ userProfile, isLogin, menuChange }) => {
  const { role } = userProfile;
  useLayoutEffect(() => {
    if(isLogin) {
      // Chat.boot({pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: 'en'})
      const routes = route_info(userProfile.role);
      const target = [
        ...routes
        .filter(item => item.route),
        ...routes
          .filter((item) => item.submenu)
          .map((item) => item.submenu)
          .flat(),
      ].find(
        (item) => {
          return item.route.startsWith("/" + window.location.pathname.split("/")[1])
        }
      );
      if (target) menuChange(target.name);
    }
  },[isLogin])
  return (
    <>
      <div className="contents">
        <div className="contents-inner">
          <React.Suspense fallback={<div>loading...</div>}>
            <Routes>
              {Route_items(role).map(item => item.submenu ? item.submenu : item).flat().map((item) => (
                <Route
                  key={item.key}
                  path={item.route}
                  element={item.component}
                />
              ))}
              <Route path="/*" element={<Navigate to="/" />}/>
            </Routes>
          </React.Suspense>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userProfile: state.userProfile,
    isLogin: state.isLogin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    menuChange: (toggle) => {
      dispatch(ActionCreators.menuStateChange(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
