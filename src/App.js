import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getError } from 'redux/actions/actionCreators';
import AuthPage from 'pages/AuthPage';
import RegistrationPage from 'pages/RegistrationPage';
import DashboardPage from 'pages/DashboardPage';
import Loader from 'components/UIElements/Loader/Loader';
import Error from 'components/UIElements/Error/Error';
import TestEditingPage from 'pages/TestEditingPage';
import ModalDialog from 'components/ModalDialog/ModalDialog';

function App() {
  const isLoading = useSelector((state) => state.UIData.isLoading);
  const errorMessage = useSelector((state) => state.UIData.errors);
  const modalDialogData = useSelector((state) => state.modalDialog);
  const dispatch = useDispatch();

  return (
    <>
      {modalDialogData.isOpen && (
        <ModalDialog
          title={modalDialogData.title}
          children={modalDialogData.children}
          primaryButtonText={modalDialogData.primaryButtonText}
          successBtnClickHandler={modalDialogData.successBtnClickHandler}
        />
      )}
      {isLoading && <Loader />}
      {errorMessage && (
        <Error message={errorMessage} hide={() => dispatch(getError(''))} />
      )}
      <Router>
        <Switch>
          <Route path="/" exact>
            <AuthPage />
          </Route>
          <Route path="/registration" exact>
            <RegistrationPage />
          </Route>
          <Route path="/dashboard" exact>
            <DashboardPage />
          </Route>
          <Route path="/tests/:id" exact>
            <TestEditingPage />
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
