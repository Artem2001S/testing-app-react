import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  requestTestsFromServer,
  requestToAddTest,
  changeAddTestFormInputValue,
  getError,
} from 'redux/actions/actionCreators';
import {
  getTests,
  getTotalPages,
  getCurrentSortType,
  getCurrentTestsListPage,
  getLastTestAddedId,
} from 'redux/selectors/tests';
import Dashboard from 'components/Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';
import { sortTypes } from 'constants.js';
import { getIsAuthorized, getIsAdmin } from 'redux/selectors/userData';
import { getSearchTestFormInputValue } from 'redux/selectors/searchTestForm';
import { getAddTestFormInput } from 'redux/selectors/addTestForm';
import { useAction } from 'hooks/useAction';

export default function DashboardContainer({ ...props }) {
  const isAuthorized = useSelector(getIsAuthorized);
  const isAdmin = useSelector(getIsAdmin);
  const totalPages = useSelector(getTotalPages);
  const sortType = useSelector(getCurrentSortType);
  const currentPaginationPage = useSelector(getCurrentTestsListPage);
  const lastTestAddedId = useSelector(getLastTestAddedId);
  const testsList = useSelector(getTests);
  const searchInputValue = useSelector(getSearchTestFormInputValue);
  const addTestInput = useSelector(getAddTestFormInput);

  const requestTestsAction = useAction(requestTestsFromServer);
  const showMessage = useAction(getError);

  const requestTests = useCallback(
    (page, search = searchInputValue, sort = sortType) => {
      requestTestsAction(page, search, sort);
    },
    [requestTestsAction, searchInputValue, sortType]
  );

  const addTestAction = useAction(requestToAddTest);
  const changeAddTestFormInputValueAction = useAction(
    changeAddTestFormInputValue
  );

  const handleChangeAddTestTitle = useCallback(
    (e) => changeAddTestFormInputValueAction(e.target.value),
    [changeAddTestFormInputValueAction]
  );

  const handleAddFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const title = addTestInput.value.trim();

      if (!title) {
        showMessage('Enter test title!');
        return;
      }

      addTestAction(addTestInput.value);
    },
    [addTestAction, addTestInput.value, showMessage]
  );

  const handleSortChange = useCallback(() => {
    requestTests(
      currentPaginationPage,
      searchInputValue,
      sortType === sortTypes.descending
        ? sortTypes.ascending
        : sortTypes.descending
    );
  }, [currentPaginationPage, requestTests, searchInputValue, sortType]);

  useEffect(() => {
    requestTests();
  }, [requestTests]);

  // check if user added test, then redirect to edit page
  if (lastTestAddedId !== -1) {
    return <Redirect to={`/tests/${lastTestAddedId}`} />;
  }

  // redirect after logout
  if (!isAuthorized) {
    return <Redirect to="/" />;
  }

  return (
    <Dashboard
      {...props}
      requestTests={requestTests}
      isAdmin={isAdmin}
      totalPages={totalPages}
      testsList={testsList}
      currentPaginationPage={currentPaginationPage}
      addTestInput={addTestInput}
      handleAddFormSubmit={handleAddFormSubmit}
      onSortChange={handleSortChange}
      onChangeTitleInput={handleChangeAddTestTitle}
    />
  );
}
