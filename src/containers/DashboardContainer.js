import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import {
  requestTestsFromServer,
  changeTestsListSortType,
  requestToAddTest,
  changeAddTestFormInputValue,
} from 'redux/actions/actionCreators';
import { getTests } from 'redux/selectors/tests';

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
  sortChange: () => dispatch(changeTestsListSortType()),
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
)(Dashboard);
