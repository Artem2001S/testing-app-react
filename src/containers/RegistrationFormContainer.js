import { connect } from 'react-redux';
import AuthForm from 'components/AuthForm/AuthForm';
import {
  changeRegistrationFormInputValue,
  changeRegistrationFormValidationStatus,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers, validateInputs } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.registrationForm.inputs,
  validationErrors: state.registrationForm.validationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, e) =>
    dispatch(changeRegistrationFormInputValue(inputName, e.target.value)),
  changeValidationStatus: (message) =>
    dispatch(changeRegistrationFormValidationStatus(message)),
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
    handleFormSubmit: (e) => {
      e.preventDefault();
      const validationStatus = validateInputs(stateProps.inputs);

      if (validationStatus) {
        dispatchProps.changeValidationStatus(validationStatus);
        return;
      }
      dispatchProps.changeValidationStatus('');
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(AuthForm);
