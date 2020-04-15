import React from 'react';
import { v4 } from 'uuid';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './RadioButton.module.scss';

export default function RadioButton({ name, label, value, handleChange }) {
  const uniqueId = v4();

  const radioIconClasses = classNames(classes.RadioIcon, {
    [classes.Active]: value,
  });

  return (
    <label className={classes.Label} htmlFor={uniqueId}>
      {label}
      <input
        id={uniqueId}
        className={classes.Radio}
        type="radio"
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <span className={radioIconClasses} />
    </label>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
};
