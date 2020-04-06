import React from 'react';
import PropTypes from 'prop-types';
import classes from './AuthForm.module.scss';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';

export default function AuthForm() {
  const inputs = [
    {
      label: 'Login',
      value: '3',
    },
    {
      label: 'Password',
      type: 'password',
      value: '32',
    },
  ];

  return (
    <form className={classes.AuthForm} onSubmit={(e) => e.preventDefault}>
      {inputs.map((input, index) => (
        <TextInput key={index} {...input} />
      ))}
      <Button>Login</Button>
    </form>
  );
}
