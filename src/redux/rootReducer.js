import { combineReducers } from 'redux';
import { authorizationFormInputsReducer as authorizationFormInputs } from 'redux/reducers/authorizationFormReducer';

export default combineReducers({
  authorizationFormInputs,
});
