import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Dashboard.module.scss';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import TestsList from 'components/TestsList/TestsList';

export default function Dashboard({
  userData,
  testsList,
  onLogout,
  requestTests,
}) {
  const modalDialogData = useSelector((state) => state.modalDialog);

  useEffect(() => {
    requestTests();
  }, []);

  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }
  console.log(testsList);

  return (
    <>
      {modalDialogData.isOpen && <ModalDialog title={modalDialogData.title} />}
      <UserPanel userData={userData} onLogout={onLogout} />
      <TestsList tests={testsList} isAdmin />
    </>
  );
}
