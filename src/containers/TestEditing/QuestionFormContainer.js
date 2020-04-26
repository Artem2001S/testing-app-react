import { connect } from 'react-redux';
import QuestionForm from 'components/QuestionForm/QuestionForm';
import {
  changeQuestionFormInputValue,
  changeQuestionFormCheckboxValue,
  changeQuestionFormAnswerPosition,
  addAnswerToQuestionForm,
  deleteAnswerFromQuestionForm,
  getError,
  sendRequestToAddQuestion,
  closeModalDialog,
  sendRequestToEditQuestion,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';
import { getVisibleInputs } from 'redux/selectors/questionForm';
import { validateAnswers } from 'utils/questionFormValidation';

const mapStateToProps = (state, ownProps) => ({
  answerInputs: getVisibleInputs(state),
  answerInputsWithDeletedAnswers: state.questionForm.inputs,
  questionTitleInput: state.questionForm.questionTitleInput,
  questionType: ownProps.questionType,
  testId: state.testEditingPage.result,
  editMode: ownProps.editMode,
  questionId: state.questionForm.questionId,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (inputName, inputType, e) =>
    dispatch(changeQuestionFormInputValue(inputName, e.target.value)),
  changeQuestionTitleInputValue: (e) =>
    dispatch(changeQuestionFormInputValue('question-title', e.target.value)),
  changeCheckboxValue: (inputName, e) =>
    dispatch(changeQuestionFormCheckboxValue(inputName, e.target.checked)),
  onAnswerMove: (from, to) =>
    dispatch(changeQuestionFormAnswerPosition(from, to)),
  onAddAnswer: () => dispatch(addAnswerToQuestionForm()),
  onDeleteAnswer: (inputName) =>
    dispatch(deleteAnswerFromQuestionForm(inputName)),
  sendRequestToAddQuestion: (testId, data) =>
    dispatch(sendRequestToAddQuestion(testId, data)),
  sendRequestToEditQuestion: (questionId, data) =>
    dispatch(sendRequestToEditQuestion(questionId, data)),
  showValidationError: (message) => dispatch(getError(message)),
  closeModalDialog: () => dispatch(closeModalDialog()),
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.answerInputs,
    dispatchProps.changeInputValue
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
    onFormSubmit: () => {
      const {
        answerInputs,
        answerInputsWithDeletedAnswers,
        questionType,
        questionTitleInput,
        testId,
        editMode,
        questionId,
      } = stateProps;
      const {
        showValidationError,
        sendRequestToAddQuestion,
        closeModalDialog,
      } = dispatchProps;

      const title = questionTitleInput.value.trim();

      // validation
      if (!title) {
        showValidationError('Enter question title');
        return;
      }

      const validationResult = validateAnswers(answerInputs, questionType);

      if (validationResult) {
        showValidationError(validationResult);
        return;
      }

      const data = {
        title,
        question_type: questionType,
        answers: answerInputs.map((input) => ({
          text: input.value,
          isRight: input.isRight,
        })),
      };

      if (editMode) {
        const editedData = {
          title,
          questionType,
          answer: null,
          answers: answerInputsWithDeletedAnswers.map((answer, index) => ({
            id: answer.id,
            text: answer.value,
            isRight: answer.isRight,
            initialIsRight: answer.initialIsRight,
            initialValue: answer.initialValue,
            isNew: answer.isNew,
            initialPosition: answer.initialPosition,
            movedTo: answer.movedTo,
            needToDelete: answer.needToDelete,
          })),
        };

        dispatchProps.sendRequestToEditQuestion(questionId, editedData);
      } else {
        sendRequestToAddQuestion(testId, data);
      }
      closeModalDialog();
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuestionForm);
