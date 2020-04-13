import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
  requestTestsFromServer,
  requestTestDeleting,
  changeTestsListSortType,
} from 'redux/actions/actionCreators';
import { getSortedTests } from 'redux/selectors/tests';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
  testsList: getSortedTests(state),
  sortType: state.tests.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
  requestTests: () => dispatch(requestTestsFromServer()),
  onDeleteTest: (id) => dispatch(requestTestDeleting(id)),
  sortChange: () => dispatch(changeTestsListSortType()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
