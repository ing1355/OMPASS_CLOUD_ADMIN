import React, { useEffect, useLayoutEffect } from "react";
import "./Contents.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect, useSelector } from "react-redux";
import Chat from "../../CustomComponents/Chat";
import ActionCreators from "../../redux/actions";
import route_info from "../../Constants/Route_items";

const Contents = ({ userProfile, isLogin, menuChange }) => {
  const { role } = userProfile;
  const navigate = useNavigate()
  const { standalone } = useSelector(state => ({
    standalone: state.standalone
  }))

  useLayoutEffect(() => {
    if (isLogin) {
      const routes = route_info(userProfile.role);
      const route_list = [
        ...routes
          .filter(item => item.route),
        ...routes
          .filter((item) => item.submenu)
          .map((item) => item.submenu)
          .flat(),
      ]
      const target = route_list.find(({route}) => route.endsWith('*') ? (route.slice(0,-2) === window.location.pathname) : window.location.pathname.startsWith(route))
      if(!target) {
        navigate('/Dashboard')
        menuChange('Dashboard')
      } else {
        menuChange(target.name);
      }
    }
  }, [isLogin])

  useLayoutEffect(() => {
    if (standalone.loaded && !standalone.standalone) {
      Chat.boot({ pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: 'ko' })
      var script = document.createElement('script');
      script.src = 'https://code.jquery.com/jquery-1.12.4.min.js'
      document.head.appendChild(script)
    }
  }, [standalone])

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
              {Route_items(role, standalone.standalone).map(item => item.submenu ? item.submenu : item).flat().map((item) => (
                item.route.endsWith('*') ? <Route
                  key={item.key}
                  path={item.route}
                  element={item.component}
                /> : <Route
                  key={item.key}
                  path={item.route.split('/').slice(0,-1).join('/') + '/:country/*'}
                  element={item.component}
                />
              ))}
              <Route path="/*" element={<Navigate to="/Dashboard" />} />
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
