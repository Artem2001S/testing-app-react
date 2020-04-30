import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  requestTestsFromServer,
  changeTestsListSortType,
  requestToAddTest,
  changeAddTestFormInputValue,
  getError,
} from 'redux/actions/actionCreators';
import { getTests } from 'redux/selectors/tests';
import Dashboard from 'components/Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';

function DashboardContainer({
  lastTestAddedId,
  isAuthorized,
  requestTests,
  ...props
}) {
  useEffect(() => {
    requestTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if user added test, then redirect to edit page
  if (lastTestAddedId !== -1) {
    return <Redirect to={`/tests/${lastTestAddedId}`} />;
  }

  // redirect after logout
  if (!isAuthorized) {
    return <Redirect to="/" />;
  }

  return <Dashboard {...props} requestTests={requestTests} />;
}

const mapStateToProps = (state) => ({
  isAdmin: state.currentUserData.isAdmin,
  isAuthorized: state.currentUserData.isAuthorized,
  addTestInput: state.addTestForm.input,
  currentPaginationPage: state.tests.currentPage,
  totalPages: state.tests.totalPages,
  searchInputValue: state.searchTestForm.value,
  testsList: getTests(state),
  sortType: state.tests.sortType,
  lastTestAddedId: state.tests.lastTestAddedId,
});

const mapDispatchToProps = (dispatch) => ({
  requestTests: (page = 1, searchValue) =>
    dispatch(requestTestsFromServer(page, searchValue || '')),
  onChangeTitleInput: (e) =>
    dispatch(changeAddTestFormInputValue(e.target.value)),
  onSortChange: () => dispatch(changeTestsListSortType()),
  onAdd: (title) => dispatch(requestToAddTest(title)),
  getValidationError: (message) => dispatch(getError(message)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  requestTests: (page) =>
    dispatchProps.requestTests(page, stateProps.searchInputValue),
  handleAddFormSubmit: (e) => {
    e.preventDefault();
    const title = stateProps.addTestInput.value.trim();

    if (!title) {
      dispatchProps.getValidationError('Enter test title!');
      return;
    }

    dispatchProps.onAdd(stateProps.addTestInput.value);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DashboardContainer);
