import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import classes from './TextInput.module.scss';

export default function TextInput({
  type,
  label,
  defaultValue,
  value,
  handleChange,
}) {
  const uniqueId = uuidv4();

  return (
    <label className={classes.label} htmlFor={uniqueId}>
      {label}
      <input
        className={classes.input}
        type={type || 'text'}
        id={uniqueId}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
