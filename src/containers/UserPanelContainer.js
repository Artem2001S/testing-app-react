import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getLogin, getIsAdmin } from 'redux/selectors/userData';
import { useAction } from 'hooks/useAction';
import { sendLogoutRequest } from 'redux/actions/actionCreators';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import Button from 'components/UIElements/Button/Button';

export default function UserPanelContainer() {
  const history = useHistory();
  const { pathname } = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const login = useSelector(getLogin);
  const isAdmin = useSelector(getIsAdmin);

  const logout = useAction(sendLogoutRequest);

  const handleShowLogoutDialog = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalDialogClose = useCallback(() => setIsModalOpen(false), []);

  const handleBack = useCallback(
    () => pathname.includes('/tests') && history.push('/dashboard'),
    [history, pathname]
  );

  const handleSuccessBtnClick = useCallback(() => {
    logout();
    setIsModalOpen(false);
  }, [logout]);

  return (
    <>
      {isModalOpen && (
        <ModalDialog header="Are you sure ?" onClose={handleModalDialogClose}>
          <Button onClick={handleSuccessBtnClick}>Yes</Button>
        </ModalDialog>
      )}
      <UserPanel
        pathname={pathname}
        isAdmin={isAdmin}
        login={login}
        onLogout={handleShowLogoutDialog}
        onBack={handleBack}
      />
    </>
  );
}
