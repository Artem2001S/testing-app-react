import React from 'react';
import classes from './UserPanel.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function UserPanel({ userData, onLogout }) {
  return (
    <div className={classes.UserPanel}>
      {userData.isAdmin && <div className={classes.Crown} />}
      <span>{`Hello, ${userData.login}`}</span>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}
