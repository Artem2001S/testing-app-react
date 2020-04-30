import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import TestsList from 'components/TestsList/TestsList';
import SearchTestFormContainer from 'containers/SearchTestFormContainer';
import PaginationButtons from 'components/PaginationButtons/PaginationButtons';
import classes from './Dashboard.module.scss';
import AddTestForm from './AddTestForm/AddTestForm';

export default function Dashboard({
  isAdmin,
  testsList,
  addTestInput,
  sortType,
  currentPaginationPage,
  lastTestAddedId,
  totalPages,
  handleAddFormSubmit,
  onChangeTitleInput,
  requestTests,
  sortChange,
}) {
  useEffect(() => {
    requestTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // redirect after test adding
  if (lastTestAddedId !== -1) {
    return <Redirect to={`/tests/${lastTestAddedId}`} />;
  }

  return (
    <>
      <div className={classes.SearchPanel}>
        <SearchTestFormContainer />
      </div>

      <AddTestForm
        input={addTestInput}
        onInputChange={onChangeTitleInput}
        handleSubmit={handleAddFormSubmit}
      />

      <TestsList
        tests={testsList}
        sortType={sortType}
        isAdmin={isAdmin}
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
  isAdmin: PropTypes.bool,
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
