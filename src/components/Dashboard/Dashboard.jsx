import React from 'react';
import PropTypes from 'prop-types';
import TestsList from 'components/TestsList/TestsList';
import PaginationButtons from 'components/PaginationButtons/PaginationButtons';
import AddTestForm from './AddTestForm/AddTestForm';
import SearchTestForm from './SearchTestForm/SearchTestForm';
import classes from './Dashboard.module.scss';

export default function Dashboard({
  isAdmin,
  testsList,
  addTestInput,
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
        <SearchTestForm />
      </div>
      {isAdmin && (
        <AddTestForm
          input={addTestInput}
          onInputChange={onChangeTitleInput}
          handleSubmit={handleAddFormSubmit}
        />
      )}

      <TestsList
        tests={testsList}
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
  currentPaginationPage: PropTypes.number,
  totalPages: PropTypes.number,
  handleAddFormSubmit: PropTypes.func.isRequired,
  onChangeTitleInput: PropTypes.func.isRequired,
  requestTests: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
};
