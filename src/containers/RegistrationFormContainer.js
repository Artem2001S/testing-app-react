import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  changeRegistrationFormInputValue,
  changeRegistrationFormValidationStatus,
  sendRegistrationRequest,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers, validateRegistrationForm } from 'utils';
import { getIsAuthorized } from 'redux/selectors/userData';
import {
  getRegistrationFormInputs,
  getRegistrationFormValidationErrors,
} from 'redux/selectors/registrationForm';
import { useAction } from 'hooks/useAction';
import Form from 'components/Form/Form';

export default function RegistrationFormContainer({ ...props }) {
  const isAuthorized = useSelector(getIsAuthorized);
  const inputs = useSelector(getRegistrationFormInputs);
  const validationErrors = useSelector(getRegistrationFormValidationErrors);

  const changeRegistrationFormInputValueAction = useAction(
    changeRegistrationFormInputValue
  );
  const changeValidationStatus = useAction(
    changeRegistrationFormValidationStatus
  );
  const registrationRequest = useAction(sendRegistrationRequest);

  const handleInputChange = useCallback(
    (inputName, inputType, e) => {
      if (inputType === 'checkbox') {
        changeRegistrationFormInputValueAction(inputName, e.target.checked);
      }

      if (inputType === 'text' || inputType === 'password') {
        changeRegistrationFormInputValueAction(inputName, e.target.value);
      }
    },
    [changeRegistrationFormInputValueAction]
  );

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const validationStatus = validateRegistrationForm(inputs);

      if (validationStatus) {
        changeValidationStatus(validationStatus);
        return;
      }

      changeValidationStatus('');

      const formValues = inputs.reduce(
        (acc, next) => ({ ...acc, [next.name]: next.value }),
        {}
      );

      registrationRequest(
        formValues.login,
        formValues.password,
        formValues.is_admin
      );
    },
    [changeValidationStatus, inputs, registrationRequest]
  );

  const inputChangeHandlers = React.useMemo(
    () => createOnChangeHandlers(inputs, handleInputChange),
    [handleInputChange, inputs]
  );

  if (isAuthorized) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Form
      btnText="Register"
      additionalLinks={[{ to: '/', label: 'Go to authorization' }]}
      inputs={inputs}
      inputChangeHandlers={inputChangeHandlers}
      validationErrors={validationErrors}
      onFormSubmit={handleFormSubmit}
    />
  );
}
