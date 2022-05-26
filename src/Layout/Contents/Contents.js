import React, { useEffect, useLayoutEffect } from "react";
import "./Contents.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect } from "react-redux";
import Chat from "../../CustomComponents/Chat";
import ActionCreators from "../../redux/actions";
import route_info from "../../Constants/Route_items";

const Contents = ({ userProfile, isLogin, menuChange }) => {
  const { role, standalone } = userProfile;
  
  useLayoutEffect(() => {
    if (isLogin) {
      Chat.boot({ pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: 'ko' })
      var script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-1.12.4.min.js'
      document.head.appendChild(script)
      const routes = route_info(userProfile.role);
      const route_list = [
        ...routes
          .filter(item => item.route),
        ...routes
          .filter((item) => item.submenu)
          .map((item) => item.submenu)
          .flat(),
      ]
      const target = route_list.filter((item) => item.route === '/*' ? item.route === window.location.pathname + '*' : window.location.pathname.startsWith(item.route.slice(0, -2)))
      if (target.length) menuChange(target[target.length - 1].name);
    }
  }, [isLogin])

  useEffect(() => {
    return () => {
      Chat.shutdown()
    }
  }, [])

  return (
    <>
      <div className="contents">
        <div className="contents-inner">
          <React.Suspense fallback={<div>loading...</div>}>
            <Routes>
              {Route_items(role, standalone).map(item => item.submenu ? item.submenu : item).flat().map((item) => (
                <Route
                  key={item.key}
                  path={item.route}
                  element={item.component}
                />
              ))}
              <Route path="/*" element={<Navigate to="/" />} />
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
