import "./App.css";
import React from "react";
import Contents from "./Layout/Contents/Contents";
import Header from "./Layout/Header/Header";
import Sidebar from "./Layout/Sidebar/Sidebar";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Login from "./Layout/Login/Login";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/login" component={Login} exact />
          <Route
            path="/"
            render={(routeInfo) => (
              <>
                <Header {...routeInfo} />
                <Sidebar {...routeInfo} />
                <Contents {...routeInfo} />
                <Footer {...routeInfo} />
              </>
            )}
          />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
