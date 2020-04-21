import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { v4 } from 'uuid';
import classes from './Checkbox.module.scss';

export default function Checkbox({ label, name, value, handleChange }) {
  const uniqueId = v4();
  const symbolClasses = classNames(classes.CheckboxSymbol, {
    [classes.CheckboxSymbolChecked]: value,
  });

  return (
    <label className={classes.label} htmlFor={uniqueId}>
      {label}
      <input
        id={uniqueId}
        className={classes.Checkbox}
        type="checkbox"
        name={name}
        checked={value}
        onChange={handleChange}
      />
      <span className={symbolClasses} />
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultChecked: PropTypes.bool,
};
