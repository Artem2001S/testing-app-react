import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TestsList from 'components/TestsList/TestsList';
import SearchTestFormContainer from 'containers/SearchTestFormContainer';
import Button from 'components/UIElements/Button/Button';
import TextInput from 'components/UIElements/TextInput/TextInput';
import PaginationButtons from 'components/PaginationButtons/PaginationButtons';
import classes from './Dashboard.module.scss';

export default function Dashboard({
  userData,
  testsList,
  addTestInput,
  sortType,
  currentPaginationPage,
  lastTestAddedId,
  totalPages,
  onAdd,
  onChangeTitleInput,
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
        sortChange={sortChange}
      />
      <div className={classes.Pagination}>
        <PaginationButtons
          totalCount={totalPages}
          current={currentPaginationPage}
          onItemClick={requestTests}
        />
      </div>
    </>
  );
}

Dashboard.propTypes = {
  userData: PropTypes.object,
  testsList: PropTypes.array,
  addTestInput: PropTypes.object,
  sortType: PropTypes.string,
  currentPaginationPage: PropTypes.number,
  lastTestAddedId: PropTypes.number,
  totalPages: PropTypes.number,
  onAdd: PropTypes.func.isRequired,
  onChangeTitleInput: PropTypes.func.isRequired,
  requestTests: PropTypes.func.isRequired,
  sortChange: PropTypes.func.isRequired,
};
