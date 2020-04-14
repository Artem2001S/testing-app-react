import { combineReducers } from 'redux';
import authorizationFormInputs from 'redux/reducers/authorizationFormReducer';
import registrationForm from 'redux/reducers/registrationFormReducer';
import UIData from 'redux/reducers/UIDataReducer';
import currentUserData from 'redux/reducers/currentUserDataReducer';
import modalDialog from 'redux/reducers/modalDialog';
import tests from 'redux/reducers/testsReducer';
import searchTestForm from 'redux/reducers/searchTestFormReducer';

export default combineReducers({
  authorizationFormInputs,
  registrationForm,
  UIData,
  currentUserData,
  modalDialog,
  tests,
  searchTestForm,
});
