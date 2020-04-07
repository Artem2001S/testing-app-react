import { connect } from 'react-redux';
import {
  changeAuthFormInputValue,
  changeAuthFormValidationStatus,
} from 'redux/actions/actionCreators';
import AuthForm from 'components/AuthForm/AuthForm';
import { createOnChangeHandlers, validateInputs } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.authorizationFormInputs.inputs,
  validationErrors: state.authorizationFormInputs.validationStatus,
  additionalLinks: [{ to: '/registration', label: 'Registration' }],
});

const mapDispatchToProps = (dispatch) => ({
  handleInputChange: (inputName, inputType, e) => {
    if (inputType === 'checkbox') {
      dispatch(changeAuthFormInputValue(inputName, e.target.checked));
    }

    if (inputType === 'text' || inputType === 'password') {
      dispatch(changeAuthFormInputValue(inputName, e.target.value));
    }
  },
  changeValidationStatus: (message) =>
    dispatch(changeAuthFormValidationStatus(message)),
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
