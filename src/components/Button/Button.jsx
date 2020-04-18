import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import classes from './Button.module.scss';

export default function Button({
  children,
  title,
  href,
  secondary,
  transparent,
  disabled,
  handleClick,
}) {
  const btnClasses = classNames(classes.Button, {
    [classes.SecondaryBtn]: secondary,
    [classes.TransparentBtn]: transparent,
    [classes.Disabled]: disabled,
  });

  return (
    <>
      {href ? (
        <Link className={btnClasses} title={title} to={href}>
          {children}
        </Link>
      ) : (
        <button
          className={btnClasses}
          to={href}
          title={title}
          disabled={disabled}
          onClick={handleClick}
        >
          {children}
        </button>
      )}
    </>
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
