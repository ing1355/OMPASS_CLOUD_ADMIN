import "./App.css";
import React, { lazy, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
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
    Chat.boot({ pluginKey: 'f6914594-d0ae-40fe-bfc0-b915e0ce6036', language: 'ko' })
    if (!isLogin) {
      setUserProfile({});
      // Chat.shutdown()
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
          <Routes>
            <Route path="/admin-signup" element={AdminSignUp} />
            <Route path="/sub-admin-signup" element={SubAdminSignUp} />
            <Route path="/reset-password" element={ResetPassword} />
            <Route path="/ompass" element={OMPASSVerify} />
            <Route
              path="/login"
              element={isLogin ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/*"
              element={!isLogin ? (
                <Navigate to="/login" />
              ) : (
                <>
                  <Header />
                  <Sidebar />
                  <Contents />
                  <Footer />
                </>
              )
              }
            />
          </Routes>
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
