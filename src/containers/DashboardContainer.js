import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
  requestTestsFromServer,
  requestTestDeleting,
} from 'redux/actions/actionCreators';
import { getTestsArray } from 'redux/selectors/tests';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
  testsList: getTestsArray(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
  requestTests: () => dispatch(requestTestsFromServer()),
  onDeleteTest: (id) => dispatch(requestTestDeleting(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
