import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
} from 'redux/actions/actionCreators';
import UserPanel from 'components/UserPanel/UserPanel';

const mapStateToProps = (state) => ({
  login: state.currentUserData.login,
  isAdmin: state.currentUserData.isAdmin,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
