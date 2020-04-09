import Dashboard from 'components/Dashboard/Dashboard';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  userData: state.currentUserData,
});

export default connect(mapStateToProps)(Dashboard);
