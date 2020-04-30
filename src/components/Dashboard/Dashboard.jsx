import React from 'react';
import PropTypes from 'prop-types';
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
  totalPages,
  handleAddFormSubmit,
  onChangeTitleInput,
  requestTests,
  onSortChange,
}) {
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
        onSortChange={onSortChange}
      />
      <div className={classes.Pagination}>
        <PaginationButtons
          totalCount={totalPages}
          currentPage={currentPaginationPage}
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
  totalPages: PropTypes.number,
  handleAddFormSubmit: PropTypes.func.isRequired,
  onChangeTitleInput: PropTypes.func.isRequired,
  requestTests: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
