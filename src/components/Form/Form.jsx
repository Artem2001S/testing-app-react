import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import classes from './Form.module.scss';
import { Link } from 'react-router-dom';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';

export default function Form({
  inputs,
  btnText,
  additionalLinks,
  validationErrors,
  inputChangeHandlers,
  handleFormSubmit,
}) {
  return (
    <form className={classes.Form} onSubmit={handleFormSubmit}>
      {inputs.map((input, index) =>
        input.type === 'checkbox' ? (
          <Checkbox
            key={`${input.name}${index}`}
            {...input}
            handleChange={inputChangeHandlers[input.name]}
          />
        ) : (
          <TextInput
            key={`${input.name}${index}`}
            {...input}
            autocomplete={input.autocomplete}
            handleChange={inputChangeHandlers[input.name]}
          />
        )
      )}

      <Button onClick={handleFormSubmit}>{btnText}</Button>

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

Form.propTypes = {
  inputs: PropTypes.array.isRequired,
  btnText: PropTypes.string.isRequired,
  validationErrors: PropTypes.string,
  additionalLinks: PropTypes.array,
  inputChangeHandlers: PropTypes.object.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
};
