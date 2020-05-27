import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Checkbox.module.scss';

function Checkbox({ label, name, value, handleChange }) {
  const symbolClasses = classNames(classes.CheckboxSymbol, {
    [classes.CheckboxSymbolChecked]: value,
  });

  return (
    <label className={classes.label}>
      {label}
      <input
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
  value: PropTypes.bool,
  handleChange: PropTypes.func.isRequired,
};

export default React.memo(Checkbox);
