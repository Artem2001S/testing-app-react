import React from 'react';
import { useHistory } from 'react-router-dom';
import classes from './UserPanel.module.scss';
import Button from 'components/UIElements/Button/Button';

export default function UserPanel({ userData, onLogout }) {
  const history = useHistory();

  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        <Button handleClick={history.goBack} small>
          &larr;
        </Button>
        {userData.isAdmin && <div className={classes.CrownIcon} />}
        <span className={classes.UserName}>{`Hello, ${userData.login}`}</span>
      </div>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}
