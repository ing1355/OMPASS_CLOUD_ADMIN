import "./App.css";
import React, { useEffect, lazy } from "react";
import Contents from "./Layout/Contents/Contents";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Login from "./Layout/Login/Login";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import AxiosController from "./AxiosController";
import locale from "./locale";
import "antd/dist/antd.css";
import ActionCreators from "./redux/actions";
import MessageController from "./MessageController";

const SubAdminSignUp = lazy(() => import("./Layout/SignUp/SubAdminSignUp"));
const AdminSignUp = lazy(() => import("./Layout/SignUp/AdminSignUp"));
const ResetPassword = lazy(() => import("./Layout/SignUp/ResetPassword"));
const OMPASSVerify = lazy(() => import("./Layout/OMPASS/OMPASSVerify"));

const App = ({ isLogin, lang, setUserProfile }) => {
  useEffect(() => {
    if (!isLogin) {
      setUserProfile({});
      localStorage.clear();
    }
  }, [isLogin]);

  return (
    <Router>
      <IntlProvider locale={lang} messages={locale[lang]}>
        <AxiosController />
        <MessageController/>
        <React.Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Route path="/admin-signup" component={AdminSignUp} />
            <Route path="/sub-admin-signup" component={SubAdminSignUp} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/ompass" component={OMPASSVerify} />
            <Route
              path="/login"
              render={(routeInfo) =>
                isLogin ? <Redirect to="/" /> : <Login {...routeInfo} />
              }
            />
            <Route
              path="/"
              render={(routeInfo) =>
                !isLogin ? (
                  <Redirect to="/login" {...routeInfo} />
                ) : (
                  <>
                    <Header {...routeInfo} />
                    <Sidebar {...routeInfo} />
                    <Contents {...routeInfo} />
                    <Footer {...routeInfo} />
                  </>
                )
              }
            />
          </Switch>
        </React.Suspense>
      </IntlProvider>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin,
    lang: state.locale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (data) => {
      dispatch(ActionCreators.setProfile(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
