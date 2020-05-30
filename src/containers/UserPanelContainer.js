import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getLogin, getIsAdmin } from 'redux/selectors/userData';
import { useAction } from 'hooks/useAction';
import {
  sendLogoutRequest,
  openModalDialog,
} from 'redux/actions/actionCreators';
import UserPanel from 'components/UserPanel/UserPanel';

export default function UserPanelContainer() {
  const history = useHistory();
  const { pathname } = useLocation();

  const login = useSelector(getLogin);
  const isAdmin = useSelector(getIsAdmin);

  const logout = useAction(sendLogoutRequest);
  const openLogoutDialog = useAction(openModalDialog);

  const handleLogout = useCallback(
    () => openLogoutDialog('Are you sure ?', logout),
    [logout, openLogoutDialog]
  );

  const handleBack = useCallback(
    () => pathname.includes('/tests') && history.push('/dashboard'),
    [history, pathname]
  );

  return (
    <UserPanel
      pathname={pathname}
      isAdmin={isAdmin}
      login={login}
      onLogout={handleLogout}
      onBack={handleBack}
    />
  );
}
