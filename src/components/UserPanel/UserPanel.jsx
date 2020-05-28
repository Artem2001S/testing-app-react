import React, { useCallback } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  sendLogoutRequest,
  openModalDialog,
} from 'redux/actions/actionCreators';
import { useAction } from 'hooks/useAction';
import { getLogin, getIsAdmin } from 'redux/selectors/userData';
import Button from 'components/UIElements/Button/Button';
import Logo from './Logo/Logo';
import classes from './UserPanel.module.scss';

function UserPanel() {
  const history = useHistory();
  const { pathname } = useLocation();

  const login = useSelector(getLogin);
  const isAdmin = useSelector(getIsAdmin);

  const logout = useAction(sendLogoutRequest);
  const openLogoutDialog = useAction(openModalDialog);

  const onLogout = useCallback(
    () => openLogoutDialog('Are you sure ?', logout),
    [logout, openLogoutDialog]
  );

  const onBack = useCallback(
    () => pathname.includes('/tests') && history.push('/dashboard'),
    [history, pathname]
  );

  return (
    <div className={classes.UserPanel}>
      <div className={classes.UserInfoContainer}>
        {isAdmin && pathname !== '/dashboard' && (
          <Button handleClick={onBack} small>
            &larr;
          </Button>
        )}
        <Logo login={login} />
      </div>
      <Button handleClick={onLogout}>Logout</Button>
    </div>
  );
}

export default UserPanel;
