import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import classes from './AuthForm.module.scss';

export default function AuthForm({
  inputs,
  validationErrors,
  inputChangeHandlers,
  handleFormSubmit,
}) {
  return (
    <form className={classes.AuthForm} onSubmit={handleFormSubmit}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          {...input}
          handleChange={inputChangeHandlers[input.name]}
        />
      ))}
      <Button handleClick={handleFormSubmit}>Login</Button>
      {validationErrors && (
        <div className={classes.Error}>{validationErrors}</div>
      )}
    </form>
  );
}

AuthForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
};
