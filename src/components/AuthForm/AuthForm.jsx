import React from 'react';
import PropTypes from 'prop-types';
import classes from './AuthForm.module.scss';
import TextInput from 'components/TextInput/TextInput';

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
    <form className={classes.AuthForm}>
      {inputs.map((input, index) => (
        <TextInput key={index} defaultValue={input.value} {...input} />
      ))}
    </form>
  );
}
