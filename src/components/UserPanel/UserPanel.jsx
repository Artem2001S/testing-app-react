import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './UserPanel.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function UserPanel({ userData, onLogout }) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        <Button
          disabled={pathname === '/dashboard'}
          handleClick={() =>
            pathname.includes('/tests') && history.push('/dashboard')
          }
          small
        >
          &larr;
        </Button>
        {userData.isAdmin && <div className={classes.CrownIcon} />}
        <span className={classes.UserName}>{`Hello, ${userData.login}`}</span>
      </div>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}

UserPanel.propTypes = {
  userData: PropTypes.object,
  onLogout: PropTypes.func.isRequired,
};
