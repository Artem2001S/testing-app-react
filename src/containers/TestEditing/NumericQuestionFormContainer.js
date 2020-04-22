import { connect } from 'react-redux';
import NumericQuestionForm from 'components/NumericQuestionForm/NumericQuestionForm';
import {
  changeNumericQuestionFormInputValue,
  sendRequestToAddQuestion,
  closeModalDialog,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';

const mapStateToProps = (state) => ({
  inputs: state.numericQuestionForm.inputs,
  testId: state.testEditingPage.result,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (inputName, inputType, e) =>
    dispatch(changeNumericQuestionFormInputValue(inputName, e.target.value)),
  sendRequestToAdd: (testId, data) =>
    dispatch(sendRequestToAddQuestion(testId, data)),
  closeModalDialog: () => dispatch(closeModalDialog()),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.inputs,
    dispatchProps.changeInputValue
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
    handleSubmit: (e) => {
      e.preventDefault();

      const [{ value: title }, { value: answer }] = stateProps.inputs;
      const data = { title, answer, question_type: 'number' };

      dispatchProps.sendRequestToAdd(stateProps.testId, data);
      dispatchProps.closeModalDialog();
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NumericQuestionForm);
