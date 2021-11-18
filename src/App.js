import "./App.css";
import React from "react";
import Contents from "./Layout/Contents/Contents";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Login from "./Layout/Login/Login";
import { IntlProvider } from 'react-intl';
import { connect } from "react-redux";
import AxiosController from "./AxiosController";
import locale from "./locale";
import "antd/dist/antd.css";
import SignUp from "./Layout/SignUp/SignUp";

const App = ({ isLogin, lang }) => {

  return (
    <Router>
      <IntlProvider locale={lang} messages={locale[lang]}>
        <AxiosController />
        <Switch>
          <Route path="/sub-admin-signup" component={SignUp} />
          <Route path="/login" render={routeInfo => isLogin ? <Redirect to="/" /> : <Login {...routeInfo} />} />
          <Route path="/" render={routeInfo => !isLogin ? <Redirect to="/login" {...routeInfo} />
            : <>
              <Header {...routeInfo} />
              <Sidebar {...routeInfo} />
              <Contents {...routeInfo} />
              <Footer {...routeInfo} />
            </>
          } />
        </Switch>
      </IntlProvider>
    </Router>
  );
};

function mapStateToProps(state) {
  return {
    isLogin: state.isLogin,
    lang: state.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
