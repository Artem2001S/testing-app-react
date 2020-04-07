import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import classes from './AuthForm.module.scss';
import { Link } from 'react-router-dom';
import Checkbox from 'components/Checkbox/Checkbox';

export default function AuthForm({
  inputs,
  additionalLinks,
  validationErrors,
  inputChangeHandlers,
  handleFormSubmit,
}) {
  return (
    <form className={classes.AuthForm} onSubmit={handleFormSubmit}>
      {inputs.map((input, index) => {
        if (!input.type) input.type = 'text';

        if (input.type === 'checkbox') {
          return (
            <Checkbox
              key={`${input.name}${index}`}
              {...input}
              handleChange={inputChangeHandlers[input.name]}
            />
          );
        }
        return (
          <TextInput
            key={`${input.name}${index}`}
            {...input}
            handleChange={inputChangeHandlers[input.name]}
          />
        );
      })}
      <Button handleClick={handleFormSubmit}>Login</Button>

      {additionalLinks &&
        additionalLinks.map((link) => (
          <Link key={link.to} className={classes.Link} to={link.to}>
            {link.label}
          </Link>
        ))}
      {validationErrors && (
        <div className={classes.Error}>{validationErrors}</div>
      )}
    </form>
  );
}

AuthForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  additionalLinks: PropTypes.array,
  inputChangeHandlers: PropTypes.object.isRequired,
};
