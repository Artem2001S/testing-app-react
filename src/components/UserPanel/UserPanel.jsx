import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation, Link } from 'react-router-dom';
import classes from './UserPanel.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function UserPanel({ userData, onLogout }) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        {userData.isAdmin && pathname !== '/dashboard' && (
          <Button
            handleClick={() =>
              pathname.includes('/tests') && history.push('/dashboard')
            }
            small
          >
            &larr;
          </Button>
        )}
        <Link
          to="/dashboard"
          className={classes.UserNameContainer}
          title="Go to dashboard"
        >
          <div className={classes.CrownIcon} />
          <span className={classes.UserName}> {`Hi, ${userData.login}`}</span>
        </Link>
      </div>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}

UserPanel.propTypes = {
  userData: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
