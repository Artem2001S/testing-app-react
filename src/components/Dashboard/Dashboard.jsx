import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import TestsList from 'components/TestsList/TestsList';

export default function Dashboard({
  userData,
  testsList,
  sortType,
  onLogout,
  onDeleteTest,
  requestTests,
  sortChange,
}) {
  const modalDialogData = useSelector((state) => state.modalDialog);

  useEffect(() => {
    requestTests();
  }, []);

  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {modalDialogData.isOpen && <ModalDialog title={modalDialogData.title} />}
      <UserPanel userData={userData} onLogout={onLogout} />
      <TestsList
        tests={testsList}
        sortType={sortType}
        isAdmin={userData.isAdmin}
        onDeleteTest={onDeleteTest}
        sortChange={sortChange}
      />
    </>
  );
}
