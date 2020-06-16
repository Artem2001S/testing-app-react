import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import QuestionForm from 'components/QuestionForm/QuestionForm';
import {
  changeQuestionFormInputValue,
  changeQuestionFormIsRightValue,
  changeQuestionFormAnswerPosition,
  addAnswerToQuestionForm,
  deleteAnswerFromQuestionForm,
  getError,
  sendRequestToAddQuestion,
  sendRequestToEditQuestion,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';
import {
  getVisibleInputs,
  getAllInputs,
  getQuestionTitleInput,
  getQuestionId,
} from 'redux/selectors/questionForm';
import { validateAnswers } from 'utils/questionFormValidation';
import { useAction } from 'hooks/useAction';
import { getCurrentTestId } from 'redux/selectors/test';

export default function QuestionFormContainer({
  questionType,
  editMode,
  closeDialog,
}) {
  const answerInputs = useSelector(getVisibleInputs);
  const answerInputsWithDeletedAnswers = useSelector(getAllInputs);
  const questionTitleInput = useSelector(getQuestionTitleInput);
  const questionId = useSelector(getQuestionId);
  const testId = useSelector(getCurrentTestId);

  const changeInputValueAction = useAction(changeQuestionFormInputValue);
  const changeCheckedAction = useAction(changeQuestionFormIsRightValue);

  const handleAnswerMoving = useAction(changeQuestionFormAnswerPosition);
  const handleAnswerAdding = useAction(addAnswerToQuestionForm);
  const handleAnswerDeleting = useAction(deleteAnswerFromQuestionForm);
  const requestToAddQuestionAction = useAction(sendRequestToAddQuestion);
  const requestToEditQuestionAction = useAction(sendRequestToEditQuestion);
  const showMessage = useAction(getError);

  const handleChangeQuestionTitleInputValue = useCallback(
    (e) => changeInputValueAction('question-title', e.target.value),
    [changeInputValueAction]
  );

  const handleChangeInputValue = useCallback(
    (inputName, inputType, e) =>
      changeInputValueAction(inputName, e.target.value),
    [changeInputValueAction]
  );

  const handleIsRightChange = useCallback(
    (inputName, isRadio, e) =>
      changeCheckedAction(inputName, isRadio, e.target.checked),
    [changeCheckedAction]
  );

  const inputChangeHandlers = React.useMemo(
    () => createOnChangeHandlers(answerInputs, handleChangeInputValue),
    [answerInputs, handleChangeInputValue]
  );

  const handleFormSubmit = useCallback(() => {
    const title = questionTitleInput.value.trim();

    // validation
    if (!title) {
      showMessage('Enter question title');
      return;
    }

    const validationResult = validateAnswers(answerInputs, questionType);

    if (validationResult) {
      showMessage(validationResult);
      return;
    }

    const data = {
      title,
      questionType,
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
        answers: answerInputsWithDeletedAnswers.map((answer) => ({
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

      requestToEditQuestionAction(questionId, editedData);
    } else {
      requestToAddQuestionAction(testId, data);
    }
    closeDialog();
  }, [
    answerInputs,
    answerInputsWithDeletedAnswers,
    closeDialog,
    editMode,
    questionId,
    questionTitleInput.value,
    questionType,
    requestToAddQuestionAction,
    requestToEditQuestionAction,
    showMessage,
    testId,
  ]);

  return (
    <QuestionForm
      answerInputs={answerInputs}
      questionTitleInput={questionTitleInput}
      editMode={editMode}
      questionType={questionType}
      inputChangeHandlers={inputChangeHandlers}
      onChangeQuestionTitleInputValue={handleChangeQuestionTitleInputValue}
      onDeleteAnswer={handleAnswerDeleting}
      onIsRightChange={handleIsRightChange}
      onAddAnswer={handleAnswerAdding}
      onAnswerMove={handleAnswerMoving}
      onFormSubmit={handleFormSubmit}
    />
  );
}
