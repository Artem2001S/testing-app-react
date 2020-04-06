import { connect } from 'react-redux';
import AuthForm from 'components/AuthForm/AuthForm';

const mapStateToProps = (state) => ({
  inputs: state.authorizationFormInputs.inputs,
});

export default connect(mapStateToProps)(AuthForm);
