import React, { useEffect, useLayoutEffect } from "react";
import "./Contents.css";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect, useSelector } from "react-redux";
import Chat from "../../CustomComponents/Chat";
import ActionCreators from "../../redux/actions";
import route_info from "../../Constants/Route_items";
import { isKorea } from "../../Functions/isKorea";

const Contents = ({ userProfile, isLogin, menuChange }) => {
  const { role, country } = userProfile;
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
      const target = route_list.find(({ route }) => route.startsWith(window.location.pathname.split('/').slice(0,2).join('/')))
      if (!target) {
        navigate('/Dashboard')
        menuChange('Dashboard')
      } else {
        menuChange(target.name);
      }
    }
  }, [isLogin])

  useLayoutEffect(() => {
    if (standalone.loaded && !standalone.standalone) {
      Chat.boot({ pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: isKorea(country) ? 'ko' : 'en' })
    }
  }, [standalone])

  useEffect(() => {
    return () => {
      console.log('clean up')
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
                  path={item.route.split('/').slice(0, -1).join('/') + '/:country/*'}
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
