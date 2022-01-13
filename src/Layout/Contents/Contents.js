import React, { useLayoutEffect } from "react";
import "./Contents.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect } from "react-redux";
import Chat from "../../CustomComponents/Chat";
import ActionCreators from "../../redux/actions";
import route_info from "../../Constants/Route_items";

const Contents = ({ userProfile, isLogin, menuChange }) => {
  const { role } = userProfile;
  useLayoutEffect(() => {
    if(isLogin) {
      Chat.boot({pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: 'en'})
      const routes = route_info(userProfile.role);
      const target = [
        ...routes,
        ...routes
          .filter((item) => item.submenu)
          .map((item) => item.submenu)
          .flat(),
      ].find(
        (item) => "/" + window.location.pathname.split("/")[1] === item.route
      );
      if (target) menuChange(target.name);
    }
  },[isLogin])
  return (
    <>
      <div className="contents">
        <div className="contents-inner">
          <React.Suspense fallback={<div>loading...</div>}>
            <Switch>
              {Route_items(role).map(item => item.submenu ? item.submenu : item).flat().map((item) => (
                <Route
                  key={item.key}
                  path={item.route}
                  exact={item.name === "Dashboard"}
                  component={item.component}
                />
              ))}
              <Redirect to="/" />
            </Switch>
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
