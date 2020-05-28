import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './RadioButton.module.scss';

function RadioButton({ name, label, value, handleChange }) {
  const radioIconClasses = classNames(classes.RadioIcon, {
    [classes.Active]: value,
  });

  return (
    <label className={classes.Label}>
      {label}
      <input
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

export default React.memo(RadioButton);
