import { connect } from 'react-redux';
import {
  openModalDialog,
  sendLogoutRequest,
} from 'redux/actions/actionCreators';
import UserPanel from 'components/UserPanel/UserPanel';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
});

const mapDispatchToProps = (dispatch) => ({
  onLogout: () =>
    dispatch(
      openModalDialog('Are you sure ?', () => dispatch(sendLogoutRequest()))
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel);
