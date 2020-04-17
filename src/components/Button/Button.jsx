import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Button.module.scss';

export default function Button({
  children,
  title,
  handleClick,
  secondary,
  transparent,
  disabled,
}) {
  const btnClasses = classNames(classes.Button, {
    [classes.SecondaryBtn]: secondary,
    [classes.TransparentBtn]: transparent,
    [classes.Disabled]: disabled,
  });

  return (
    <button
      className={btnClasses}
      title={title}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};
