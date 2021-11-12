import "./App.css";
import React, { useEffect, useState } from "react";
import Contents from "./Layout/Contents/Contents";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Login from "./Layout/Login/Login";
import { IntlProvider } from 'react-intl';
import { connect } from "react-redux";
import locale from "./locale";

const App = ({ isLogin, lang }) => {

  return (
    <IntlProvider locale={lang} messages={locale[lang]}>
      <Router>
        <Switch>
          {
            !isLogin ? <Login />
              : <>
                <Header />
                <Sidebar />
                <Contents />
                <Footer />
              </>
          }
        </Switch>
      </Router>
    </IntlProvider>
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
