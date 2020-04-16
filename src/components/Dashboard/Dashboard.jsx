import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import TestsList from 'components/TestsList/TestsList';
import SearchTestInputContainer from 'containers/SearchTestInputContainer';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import classes from './Dashboard.module.scss';

export default function Dashboard({
  userData,
  testsList,
  sortType,
  onLogout,
  onAdd,
  onDeleteTest,
  requestTests,
  sortChange,
}) {
  const modalDialogData = useSelector((state) => state.modalDialog);

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    requestTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {modalDialogData.isOpen && <ModalDialog title={modalDialogData.title} />}
      <UserPanel userData={userData} onLogout={onLogout} />
      <div className={classes.SearchPanel}>
        <SearchTestInputContainer />
      </div>
      <div className={classes.AddLinkWrapper}>
        <TextInput
          value={inputValue}
          handleChange={(e) => setInputValue(e.target.value)}
        />
        <Button handleClick={onAdd.bind(this, inputValue)}>Add test</Button>
      </div>
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
