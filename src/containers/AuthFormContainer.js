import { connect } from 'react-redux';
import {
  changeAuthFormInputValue,
  changeAuthFormValidationStatus,
  sendAuthorizationRequest,
} from 'redux/actions/actionCreators';
import Form from 'components/Form/Form';
import { createOnChangeHandlers, validateInputs } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.authorizationFormInputs.inputs,
  validationErrors: state.authorizationFormInputs.validationStatus,
  requestErrors: state.UIData.errors,
  isAuthorized: state.currentUserData.isAuthorized,
  additionalLinks: [{ to: '/registration', label: 'Registration' }],
  btnText: 'Login',
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, inputType, e) => {
    if (inputType === 'checkbox') {
      dispatch(changeAuthFormInputValue(inputName, e.target.checked));
    }

    if (inputType === 'text' || inputType === 'password') {
      dispatch(changeAuthFormInputValue(inputName, e.target.value));
    }
  },
  changeValidationStatus: (message) =>
    dispatch(changeAuthFormValidationStatus(message)),
  sendAuthorizationRequest: (username, password) =>
    dispatch(sendAuthorizationRequest(username, password)),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.inputs,
    dispatchProps.handleInputChange
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
    handleFormSubmit: (e) => {
      e.preventDefault();
      const validationStatus = validateInputs(stateProps.inputs);

      if (validationStatus) {
        dispatchProps.changeValidationStatus(validationStatus);
        return;
      }
      dispatchProps.changeValidationStatus('');

      const formValues = stateProps.inputs.reduce((acc, next) => {
        return { ...acc, [next.name]: next.value };
      }, {});

      dispatchProps.sendAuthorizationRequest(
        formValues.login,
        formValues.password
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form);
