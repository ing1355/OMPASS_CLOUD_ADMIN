import React from "react";
import "./Contents.css";
import { Switch, Route } from "react-router-dom";
import Route_items from "../../Constants/Route_items";
import { connect } from "react-redux";
import ActionCreators from "../../redux/actions";
import ApplicationDetail from "./Applications/ApplicationDetail";
import AdminAdd from "./Admins/AdminAdd";

const Contents = () => {
  return (
    <>
      <div className="contents">
        <div className="contents-inner">
          <div className="contents-container">
            <React.Suspense fallback={<div>loading...</div>}>
              <Switch>
                <Route path="/Admins/Add" component={AdminAdd}/>
                {Route_items.map((item) => (
                  <Route
                    key={item.key}
                    path={item.route}
                    exact={item.name === "Dashboard"}
                    component={item.component}
                  />
                ))}
              </Switch>
            </React.Suspense>
          </div>
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
