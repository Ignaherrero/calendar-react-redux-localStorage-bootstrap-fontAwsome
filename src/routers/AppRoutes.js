import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CalendarScreen from "../calendar/CalendarScreen";
import { LoginScreen } from "../ui/LoginScreen";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const AppRoutes = () => {
  return (
    <Provider store={store}>
      <div>
        <Router>
          <Switch>
            <Route exact path="/login">
              <LoginScreen />
            </Route>
            <Route exact path="/">
              <CalendarScreen />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};
