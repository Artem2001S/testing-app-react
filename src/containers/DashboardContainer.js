import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
  requestTestsFromServer,
  changeTestsListSortType,
  requestToAddTest,
} from 'redux/actions/actionCreators';
import { getTests } from 'redux/selectors/tests';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
  currentPage: state.tests.currentPage,
  totalPages: state.tests.totalPages,
  searchInputValue: state.searchTestForm.value,
  testsList: getTests(state),
  sortType: state.tests.sortType,
  lastTestAddedId: state.tests.lastTestAddedId,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
  requestTests: (page = 1, searchValue) =>
    dispatch(requestTestsFromServer(page, searchValue || '')),
  sortChange: () => dispatch(changeTestsListSortType()),
  onAdd: (title) => dispatch(requestToAddTest(title)),
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  requestTests: (page) =>
    dispatchProps.requestTests(page, stateProps.searchInputValue),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(Dashboard);
