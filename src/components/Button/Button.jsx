import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import classes from './Button.module.scss';

export default function Button({
  children,
  handleClick,
  secondary,
  transparent,
}) {
  const btnClasses = classNames(classes.Button, {
    [classes.SecondaryBtn]: secondary,
    [classes.TransparentBtn]: transparent,
  });

  return (
    <button className={btnClasses} onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  secondary: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};
