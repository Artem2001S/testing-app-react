import React from 'react';
import PropTypes from 'prop-types';
import classes from './AuthForm.module.scss';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';

export default function AuthForm({ inputs, inputChangeHandlers }) {
  return (
    <form className={classes.AuthForm} onSubmit={(e) => e.preventDefault()}>
      {inputs.map((input, index) => (
        <TextInput
          key={index}
          {...input}
          handleChange={inputChangeHandlers[input.name]}
        />
      ))}
      <Button>Login</Button>
    </form>
  );
}

AuthForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.array.isRequired,
};
