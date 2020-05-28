import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import NumericQuestionForm from 'components/NumericQuestionForm/NumericQuestionForm';
import {
  changeNumericQuestionFormInputValue,
  sendRequestToAddQuestion,
  closeModalDialog,
  sendRequestToEditQuestion,
  getError,
} from 'redux/actions/actionCreators';
import { createOnChangeHandlers } from 'utils';
import {
  getNumericQuestionFormInputs,
  getNumericQuestionFormQuestionId,
} from 'redux/selectors/numericQuestionForm';
import { getCurrentTestId } from 'redux/selectors/test';
import { useAction } from 'hooks/useAction';

export default function NumericQuestionFormContainer({ editMode }) {
  const inputs = useSelector(getNumericQuestionFormInputs);
  const questionId = useSelector(getNumericQuestionFormQuestionId);
  const testId = useSelector(getCurrentTestId);

  const onInputChange = useAction(changeNumericQuestionFormInputValue);
  const showValidationError = useAction(getError);
  const closeModal = useAction(closeModalDialog);
  const requestToEdit = useAction(sendRequestToEditQuestion);
  const requestToAdd = useAction(sendRequestToAddQuestion);

  const handleInputChange = useCallback(
    (inputName, inputType, e) => onInputChange(inputName, e.target.value),
    [onInputChange]
  );

  const inputChangeHandlers = createOnChangeHandlers(inputs, handleInputChange);

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const [{ value: title }, { value: answer }] = inputs;
      const data = { title, answer, questionType: 'number' };

      if (!title || !answer) {
        showValidationError('Enter data!');
        return;
      }

      if (editMode) {
        requestToEdit(questionId, data);
      } else {
        requestToAdd(testId, data);
      }

      closeModal();
    },
    [
      closeModal,
      editMode,
      inputs,
      questionId,
      requestToAdd,
      requestToEdit,
      showValidationError,
      testId,
    ]
  );

  return (
    <NumericQuestionForm
      inputs={inputs}
      editMode={editMode}
      inputChangeHandlers={inputChangeHandlers}
      handleSubmit={handleFormSubmit}
    />
  );
}
