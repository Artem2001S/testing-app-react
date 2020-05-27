import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Logo.module.scss';

function Logo({ login }) {
  return (
    <Link
      to="/dashboard"
      className={classes.UserNameContainer}
      title="Go to dashboard"
    >
      <div className={classes.CrownIcon} />
      <span className={classes.UserName}> {`Hi, ${login}`}</span>
    </Link>
  );
}

export default React.memo(Logo);
