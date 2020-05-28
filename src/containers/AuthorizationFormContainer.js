import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {
  changeAuthFormInputValue,
  changeAuthFormValidationStatus,
  sendAuthorizationRequest,
} from 'redux/actions/actionCreators';
import { getIsAuthorized } from 'redux/selectors/userData';
import {
  getAuthorizationFormInputs,
  getAuthorizationFormValidationErrors,
} from 'redux/selectors/authorizationForm';
import { createOnChangeHandlers, validateInputs } from 'utils';
import { useAction } from 'hooks/useAction';
import Form from 'components/Form/Form';

export default function AuthorizationFormContainer({ ...props }) {
  const isAuthorized = useSelector(getIsAuthorized);
  const inputs = useSelector(getAuthorizationFormInputs);
  const validationErrors = useSelector(getAuthorizationFormValidationErrors);

  const onInputChange = useAction(changeAuthFormInputValue);
  const changeValidationStatus = useAction(changeAuthFormValidationStatus);
  const authorizationRequest = useAction(sendAuthorizationRequest);

  const handleInputChange = useCallback(
    (inputName, inputType, e) => {
      if (inputType === 'checkbox') {
        onInputChange(inputName, e.target.checked);
      }

      if (inputType === 'text' || inputType === 'password') {
        onInputChange(inputName, e.target.value);
      }
    },
    [onInputChange]
  );

  const inputChangeHandlers = React.useMemo(
    () => createOnChangeHandlers(inputs, handleInputChange),
    [handleInputChange, inputs]
  );

  const authorizationFormSubmit = (e) => {
    e.preventDefault();
    const validationStatus = validateInputs(inputs);
    if (validationStatus) {
      changeValidationStatus(validationStatus);
      return;
    }
    changeValidationStatus('');

    const formValues = inputs.reduce((acc, next) => {
      return { ...acc, [next.name]: next.value };
    }, {});

    authorizationRequest(formValues.login, formValues.password);
  };

  // if user authorized then redirect to dashboard page
  if (isAuthorized) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Form
      btnText="Login"
      additionalLinks={[{ to: '/registration', label: 'Go to registration' }]}
      inputs={inputs}
      validationErrors={validationErrors}
      inputChangeHandlers={inputChangeHandlers}
      handleFormSubmit={authorizationFormSubmit}
      {...props}
    />
  );
}
