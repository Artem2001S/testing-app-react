import { connect } from 'react-redux';
import { changeAuthFormInputValue } from 'redux/actions/actionCreators';
import AuthForm from 'components/AuthForm/AuthForm';
import { createOnChangeHandlers } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.authorizationFormInputs.inputs,
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, e) =>
    dispatch(changeAuthFormInputValue(inputName, e.target.value)),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.inputs,
    dispatchProps.handleInputChange
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AuthForm);
