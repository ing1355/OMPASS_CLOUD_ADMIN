import React from "react";
import "./Contents.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";

const Contents = ({ userProfile }) => {
  const { role } = userProfile;
  return (
    <>
      <div className="contents">
        <div className="contents-inner">
          <React.Suspense fallback={<div>loading...</div>}>
            <Switch>
              {[...Route_items(role), ...Route_items(role).filter(item => item.submenu).map(item => item.submenu).flat()].map((item) => (
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
    userProfile: state.userProfile
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
