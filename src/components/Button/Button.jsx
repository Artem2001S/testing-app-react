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
}) {
  const btnClasses = classNames(classes.Button, {
    [classes.SecondaryBtn]: secondary,
    [classes.TransparentBtn]: transparent,
  });

  return (
    <button className={btnClasses} title={title} onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  title: PropTypes.string,
  secondary: PropTypes.bool,
  transparent: PropTypes.bool,
  children: PropTypes.node,
  handleClick: PropTypes.func,
};
