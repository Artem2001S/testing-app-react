import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

export default function Button({ children, handleClick }) {
  return (
    <button className={classes.Button} onClick={handleClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  handleClick: PropTypes.func,
};
