import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  changeRegistrationFormInputValue,
  changeRegistrationFormValidationStatus,
  sendRegistrationRequest,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers, validateRegistrationForm } from 'utils';
import Form from 'components/Form/Form';

function RegistrationFormContainer({ isAuthorized, ...props }) {
  if (isAuthorized) {
    return <Redirect to="/dashboard" />;
  }

  return <Form {...props} />;
}

const mapStateToProps = (state) => ({
  inputs: state.registrationForm.inputs,
  validationErrors: state.registrationForm.validationStatus,
  isAuthorized: state.currentUserData.isAuthorized,
  additionalLinks: [{ to: '/', label: 'Go to authorization' }],
  btnText: 'Register',
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, inputType, e) => {
    if (inputType === 'checkbox') {
      dispatch(changeRegistrationFormInputValue(inputName, e.target.checked));
    }

    if (inputType === 'text' || inputType === 'password') {
      dispatch(changeRegistrationFormInputValue(inputName, e.target.value));
    }
  },
  changeValidationStatus: (message) =>
    dispatch(changeRegistrationFormValidationStatus(message)),
  sendRegistrationRequest: (userName, password, isAdmin) =>
    dispatch(sendRegistrationRequest(userName, password, isAdmin)),
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
      const validationStatus = validateRegistrationForm(stateProps.inputs);

      if (validationStatus) {
        dispatchProps.changeValidationStatus(validationStatus);
        return;
      }

      dispatchProps.changeValidationStatus('');

      const formValues = stateProps.inputs.reduce(
        (acc, next) => ({ ...acc, [next.name]: next.value }),
        {}
      );

      console.log('forms');

      dispatchProps.sendRegistrationRequest(
        formValues.login,
        formValues.password,
        formValues.is_admin
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(RegistrationFormContainer);
