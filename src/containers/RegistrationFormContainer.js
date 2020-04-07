import { connect } from 'react-redux';
import Form from 'components/Form/Form';
import {
  changeRegistrationFormInputValue,
  changeRegistrationFormValidationStatus,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers, validateRegistrationForm } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.registrationForm.inputs,
  validationErrors: state.registrationForm.validationStatus,
  additionalLinks: [{ to: '/', label: 'Go to authorization' }],
  btnText: 'Register',
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, inputType, e) => {
    if (inputType === 'checkbox') {
      dispatch(changeRegistrationFormInputValue(inputName, e.target.checked));
    }

    if (inputType === 'text' || inputType === 'password') {
      dispatch(changeRegistrationFormInputValue(inputName, e.target.value));
    }
  },
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
      const validationStatus = validateRegistrationForm(stateProps.inputs);

      if (validationStatus) {
        dispatchProps.changeValidationStatus(validationStatus);
        return;
      }

      dispatchProps.changeValidationStatus('');
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Form);
