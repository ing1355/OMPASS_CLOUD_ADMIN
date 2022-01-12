import "./App.css";
import React, { lazy, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import AxiosController from "./AxiosController";
import locale from "./locale";
import ActionCreators from "./redux/actions";
import MessageController from "./MessageController";
import Chat from "./CustomComponents/Chat";

const SubAdminSignUp = lazy(() => import("./Layout/SignUp/SubAdminSignUp"));
const AdminSignUp = lazy(() => import("./Layout/SignUp/AdminSignUp"));
const ResetPassword = lazy(() => import("./Layout/SignUp/ResetPassword"));
const OMPASSVerify = lazy(() => import("./Layout/OMPASS/OMPASSVerify"));
const Contents = lazy(() => import("./Layout/Contents/Contents"))
const Header = lazy(() => import("./Layout/Header/Header"))
const Sidebar = lazy(() => import("./Layout/Sidebar/Sidebar"))
const Login = lazy(() => import("./Layout/Login/Login"))
const Footer = lazy(() => import("./Layout/Footer/Footer"))

const App = ({
  isLogin,
  lang,
  setUserProfile,
  localeChange,
  userProfile
}) => {

  useLayoutEffect(() => {
    if (!isLogin) {
      setUserProfile({});
      Chat.shutdown()
      localStorage.removeItem("Authorization");
    } else {
      if (localStorage.getItem("locale"))
        localeChange(localStorage.getItem("locale"));
      else {
        const { country } = userProfile;
        localStorage.setItem("locale", country === "KR" ? "ko" : "en");
        localeChange(country === "KR" ? "ko" : "en");
      }
    }
  }, [isLogin]);

  return (
    <Router>
      <IntlProvider locale={lang} messages={locale[lang]}>
        <AxiosController />
        <MessageController />
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
    userProfile: state.userProfile,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (data) => {
      dispatch(ActionCreators.setProfile(data));
    },
    localeChange: (toggle) => {
      dispatch(ActionCreators.localeChange(toggle));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
