import React from 'react';
import PropTypes from 'prop-types';
import classes from './Error.module.scss';

export default function Error({ message, hide }) {
  return (
    <div className={classes.ErrorMessage} onClick={hide}>
      <span className={classes.Message}>{message}</span>
      <span className={classes.Tip}>click to hide</span>
    </div>
  );
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
};
