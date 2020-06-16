import { combineReducers } from 'redux';
import authorizationFormInputs from 'redux/reducers/authorizationFormReducer';
import registrationForm from 'redux/reducers/registrationFormReducer';
import UIData from 'redux/reducers/UIDataReducer';
import currentUserData from 'redux/reducers/currentUserDataReducer';
import tests from 'redux/reducers/testsReducer';
import searchTestForm from 'redux/reducers/searchTestFormReducer';
import testEditingPage from 'redux/reducers/testEditingReducer';
import numericQuestionForm from 'redux/reducers/numericQuestionFormReducer';
import questionForm from 'redux/reducers/questionFormReducer';
import addTestForm from 'redux/reducers/addTestFormReducer';
import quiz from 'redux/reducers/quizReducer';

export default combineReducers({
  authorizationFormInputs,
  registrationForm,
  UIData,
  currentUserData,
  tests,
  searchTestForm,
  addTestForm,
  testEditingPage,
  numericQuestionForm,
  questionForm,
  quiz,
});
