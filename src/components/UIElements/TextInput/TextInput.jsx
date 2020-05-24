import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';
import classes from './TextInput.module.scss';

export default function TextInput({
  type,
  label,
  className,
  defaultValue,
  autocomplete,
  value,
  name,
  handleChange,
}) {
  const uniqueId = useMemo(() => uuidv4(), []);

  const labelClasses = classNames(className, classes.label);

  return (
    <label className={labelClasses} htmlFor={uniqueId}>
      {label}
      <input
        className={classes.input}
        id={uniqueId}
        type={type || 'text'}
        autoComplete={autocomplete}
        name={name}
        defaultValue={defaultValue}
        value={value}
        onChange={handleChange}
      />
    </label>
  );
}

TextInput.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
};
