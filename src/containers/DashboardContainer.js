import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  requestTestsFromServer,
  changeTestsListSortType,
  requestToAddTest,
  changeAddTestFormInputValue,
} from 'redux/actions/actionCreators';
import { getTests } from 'redux/selectors/tests';
import Dashboard from 'components/Dashboard/Dashboard';
import { Redirect } from 'react-router-dom';

function DashboardContainer({ lastTestAddedId, requestTests, ...props }) {
  useEffect(() => {
    requestTests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // check if user added test, then redirect to edit page
  if (lastTestAddedId !== -1) {
    return <Redirect to={`/tests/${lastTestAddedId}`} />;
  }

  return <Dashboard {...props} requestTests={requestTests} />;
}

const mapStateToProps = (state) => ({
  isAdmin: state.currentUserData.isAdmin,
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
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  requestTests: (page) =>
    dispatchProps.requestTests(page, stateProps.searchInputValue),
  handleAddFormSubmit: (e) => {
    e.preventDefault();
    dispatchProps.onAdd(stateProps.addTestInput.value);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(DashboardContainer);
