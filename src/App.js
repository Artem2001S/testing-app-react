import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import AuthPage from 'pages/AuthPage';
import RegistrationPage from 'pages/RegistrationPage';
import DashboardPage from 'pages/DashboardPage';
import { useSelector, useDispatch } from 'react-redux';
import Loader from 'components/Loader/Loader';
import Error from 'components/Error/Error';
import { getError } from 'redux/actions/actionCreators';

function App() {
  const isLoading = useSelector((state) => state.UIData.isLoading);
  const errorMessage = useSelector((state) => state.UIData.errors);
  const dispatch = useDispatch();

  return (
    <>
      {isLoading && <Loader />}
      {errorMessage && (
        <Error message={errorMessage} hide={() => dispatch(getError(''))} />
      )}
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
    </>
  );
}

export default App;
