import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import classes from './UserPanel.module.scss';
import Button from 'components/UIElements/Button/Button';
import Logo from './Logo/Logo';

function UserPanel({ isAdmin, login, onLogout }) {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        {isAdmin && pathname !== '/dashboard' && (
          <Button
            handleClick={() =>
              pathname.includes('/tests') && history.push('/dashboard')
            }
            small
          >
            &larr;
          </Button>
        )}
        <Logo login={login} />
      </div>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}

UserPanel.propTypes = {
  login: PropTypes.string,
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func.isRequired,
};

export default React.memo(UserPanel);
