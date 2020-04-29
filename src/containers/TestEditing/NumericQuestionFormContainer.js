import { connect } from 'react-redux';
import NumericQuestionForm from 'components/NumericQuestionForm/NumericQuestionForm';
import {
  changeNumericQuestionFormInputValue,
  sendRequestToAddQuestion,
  closeModalDialog,
  sendRequestToEditQuestion,
  getError,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';

const mapStateToProps = (state, ownProps) => ({
  inputs: state.numericQuestionForm.inputs,
  questionId: state.numericQuestionForm.questionId,
  editMode: ownProps.editMode,
  testId: state.testEditingPage.result,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (inputName, inputType, e) =>
    dispatch(changeNumericQuestionFormInputValue(inputName, e.target.value)),
  sendRequestToAdd: (testId, data) =>
    dispatch(sendRequestToAddQuestion(testId, data)),
  sendRequestToEdit: (questionId, data) =>
    dispatch(sendRequestToEditQuestion(questionId, data)),
  closeModalDialog: () => dispatch(closeModalDialog()),
  getValidationError: (message) => dispatch(getError(message)),
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
      const data = { title, answer, questionType: 'number' };

      if (!title || !answer) {
        dispatchProps.getValidationError('Enter data!');
        return;
      }

      if (stateProps.editMode) {
        dispatchProps.sendRequestToEdit(stateProps.questionId, data);
      } else {
        dispatchProps.sendRequestToAdd(stateProps.testId, data);
      }

      dispatchProps.closeModalDialog();
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(NumericQuestionForm);
