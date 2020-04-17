import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserPanel from 'components/UserPanel/UserPanel';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import TestsList from 'components/TestsList/TestsList';
import SearchTestFormContainer from 'containers/SearchTestFormContainer';
import Button from 'components/Button/Button';
import TextInput from 'components/TextInput/TextInput';
import classes from './Dashboard.module.scss';
import PaginationButtons from 'components/PaginationButtons/PaginationButtons';

export default function Dashboard({
  userData,
  testsList,
  sortType,
  currentPage,
  totalPages,
  onLogout,
  onSearch,
  onAdd,
  onDeleteTest,
  requestTests,
  sortChange,
}) {
  const modalDialogData = useSelector((state) => state.modalDialog);

  const [addInputValue, setAddInputValue] = useState('');

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
        <SearchTestFormContainer />
      </div>
      <div className={classes.AddLinkWrapper}>
        <TextInput
          value={addInputValue}
          handleChange={(e) => setAddInputValue(e.target.value)}
        />
        <Button handleClick={onAdd.bind(this, addInputValue)}>Add test</Button>
      </div>
      <TestsList
        tests={testsList}
        sortType={sortType}
        isAdmin={userData.isAdmin}
        onDeleteTest={onDeleteTest}
        sortChange={sortChange}
      />
      <div className={classes.Pagination}>
        <PaginationButtons
          totalCount={totalPages}
          current={currentPage}
          onItemClick={requestTests}
        />
      </div>
    </>
  );
}
