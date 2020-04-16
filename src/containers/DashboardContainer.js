import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
  requestTestsFromServer,
  requestTestDeleting,
  changeTestsListSortType,
  requestToAddTest,
} from 'redux/actions/actionCreators';
import { getTests } from 'redux/selectors/tests';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
  currentPage: state.tests.currentPage,
  totalPages: state.tests.totalPages,
  testsList: getTests(state),
  sortType: state.tests.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
  requestTests: (page = 1) => dispatch(requestTestsFromServer(page)),
  onDeleteTest: (id) =>
    dispatch(
      openModalDialog('Delete test ?', () => dispatch(requestTestDeleting(id)))
    ),
  sortChange: () => dispatch(changeTestsListSortType()),
  onAdd: (title) => dispatch(requestToAddTest(title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
