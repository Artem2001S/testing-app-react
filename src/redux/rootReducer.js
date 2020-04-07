import { combineReducers } from 'redux';
import { authorizationFormInputsReducer as authorizationFormInputs } from 'redux/reducers/authorizationFormReducer';
import { registrationFormReducer as registrationForm } from 'redux/reducers/registrationFormReducer';
export default combineReducers({
  authorizationFormInputs,
  registrationForm,
});
