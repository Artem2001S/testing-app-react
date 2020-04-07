import { combineReducers } from 'redux';
import authorizationFormInputs from 'redux/reducers/authorizationFormReducer';
import registrationForm from 'redux/reducers/registrationFormReducer';
import UIData from 'redux/reducers/UIDataReducer';
import currentUserDataReducer from 'redux/reducers/UIDataReducer';

export default combineReducers({
  authorizationFormInputs,
  registrationForm,
  UIData,
  currentUserDataReducer,
});
