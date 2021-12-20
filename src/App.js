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
import route_info from "./Constants/Route_items";

const SubAdminSignUp = lazy(() => import("./Layout/SignUp/SubAdminSignUp"));
const AdminSignUp = lazy(() => import("./Layout/SignUp/AdminSignUp"));
const ResetPassword = lazy(() => import("./Layout/SignUp/ResetPassword"));
const OMPASSVerify = lazy(() => import("./Layout/OMPASS/OMPASSVerify"));

const App = ({ isLogin, lang, setUserProfile, localeChange, userProfile, menuChange }) => {
  useEffect(() => {
    if (!isLogin) {
      setUserProfile({});
      localStorage.clear();
    } else {
      const routes = route_info(userProfile.role);
      const target = [...routes, ...routes.filter(item => item.submenu).map(item => item.submenu).flat()].find(item => window.location.pathname === item.route);
      if(target) menuChange(target.name);
      if(localStorage.getItem('locale')) localeChange(localStorage.getItem('locale'))
      else {
        const {country} = userProfile;
        localStorage.setItem('locale', country === 'KR' ? 'ko' : 'en');
        localeChange(country === 'KR' ? 'ko' : 'en');
      }
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
    },
    menuChange: (toggle) => {
      dispatch(ActionCreators.menuStateChange(toggle));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
