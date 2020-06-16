import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import classes from './Button.module.scss';

function Button({
  children,
  title,
  href,
  secondary,
  transparent,
  dangerous,
  small,
  disabled,
  onClick,
}) {
  const btnClasses = classNames(classes.Button, {
    [classes.SecondaryBtn]: secondary,
    [classes.TransparentBtn]: transparent,
    [classes.Disabled]: disabled,
    [classes.Dangerous]: dangerous,
    [classes.Small]: small,
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
          onClick={onClick}
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
  href: PropTypes.string,
  dangerous: PropTypes.bool,
  small: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default React.memo(Button);
