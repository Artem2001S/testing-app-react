import React from 'react';
import Button from 'components/UIElements/Button/Button';
import Logo from './Logo/Logo';
import classes from './UserPanel.module.scss';

function UserPanel({ login, isAdmin, pathname, onLogout, onBack }) {
  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        {isAdmin && pathname !== '/dashboard' && (
          <Button onClick={onBack} small>
            &larr;
          </Button>
        )}
        <Logo login={login} />
      </div>
      <Button onClick={onLogout}>Logout</Button>
    </div>
  );
}

export default React.memo(UserPanel);
