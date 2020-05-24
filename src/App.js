import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import {
  getIsLoading,
  getErrorMessage,
  getModalDialogData,
} from 'redux/selectors/UIData';
import { useSelector } from 'react-redux';
import { useAction } from 'hooks/useAction';
import { getError } from 'redux/actions/actionCreators';
import AuthPage from 'pages/AuthPage';
import RegistrationPage from 'pages/RegistrationPage';
import DashboardPage from 'pages/DashboardPage';
import Loader from 'components/UIElements/Loader/Loader';
import Error from 'components/UIElements/Error/Error';
import TestEditingPage from 'pages/TestEditingPage';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import QuizPage from 'pages/QuizPage';

function App() {
  const isLoading = useSelector(getIsLoading);
  const errorMessage = useSelector(getErrorMessage);
  const modalDialogData = useSelector(getModalDialogData);

  const onHiderErrorMessage = useAction(getError);

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
        <Error message={errorMessage} hide={onHiderErrorMessage} />
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
          <Route path="/quiz/:testId" exact>
            <QuizPage />
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
