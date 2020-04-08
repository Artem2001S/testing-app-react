import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import store from 'redux/store';
import RegistrationPage from 'pages/RegistrationPage';
import DashboardPage from 'pages/DashboardPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <AuthPage />
          </Route>
          <Route path="/registration">
            <RegistrationPage />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
