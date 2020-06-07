import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getLogin, getIsAdmin } from 'redux/selectors/userData';
import { useAction } from 'hooks/useAction';
import { sendLogoutRequest } from 'redux/actions/actionCreators';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';

export default function UserPanelContainer() {
  const history = useHistory();
  const { pathname } = useLocation();

  const [modalDialogData, setModalDialogData] = useState(null);

  const login = useSelector(getLogin);
  const isAdmin = useSelector(getIsAdmin);

  const logout = useAction(sendLogoutRequest);

  const handleLogout = useCallback(() => {
    setModalDialogData({
      onSuccessBtnClick: logout,
      successBtnText: 'Yes',
    });
  }, [logout]);

  const handleModalDialogClose = useCallback(
    () => setModalDialogData(null),
    []
  );

  const handleBack = useCallback(
    () => pathname.includes('/tests') && history.push('/dashboard'),
    [history, pathname]
  );

  return (
    <>
      {modalDialogData && (
        <ModalDialog
          header="Are you sure ?"
          onClose={handleModalDialogClose}
          successBtnText={modalDialogData.successBtnText}
          onSuccessBtnClick={modalDialogData.onSuccessBtnClick}
        />
      )}
      <UserPanel
        pathname={pathname}
        isAdmin={isAdmin}
        login={login}
        onLogout={handleLogout}
        onBack={handleBack}
      />
    </>
  );
}
