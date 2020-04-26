import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import UserPanel from 'components/UserPanel/UserPanel';
import TestsList from 'components/TestsList/TestsList';
import SearchTestFormContainer from 'containers/SearchTestFormContainer';
import Button from 'components/UIElements/Button/Button';
import TextInput from 'components/UIElements/TextInput/TextInput';
import classes from './Dashboard.module.scss';
import PaginationButtons from 'components/PaginationButtons/PaginationButtons';

export default function Dashboard({
  userData,
  testsList,
  addTestInput,
  sortType,
  currentPage,
  lastTestAddedId,
  totalPages,
  onLogout,
  onAdd,
  onChangeTitleInput,
  onDeleteTest,
  requestTests,
  sortChange,
}) {
  useEffect(() => {
    requestTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!userData.isAuthorized) {
    return <Redirect to="/" />;
  }

  // redirect after test adding
  if (lastTestAddedId !== -1) {
    return <Redirect to={`/tests/${lastTestAddedId}`} />;
  }

  return (
    <>
      <UserPanel userData={userData} onLogout={onLogout} />
      <div className={classes.SearchPanel}>
        <SearchTestFormContainer />
      </div>
      <div className={classes.AddLinkWrapper}>
        <TextInput
          value={addTestInput.value}
          handleChange={onChangeTitleInput}
        />
        <Button handleClick={onAdd}>Add test</Button>
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
