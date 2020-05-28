import React, { useCallback } from 'react';
import { connect, useSelector } from 'react-redux';
import NumberQuestionForm from 'components/NumberQuestionForm/NumberQuestionForm';
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

export default function NumberQuestionFormContainer({ editMode }) {
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
    <NumberQuestionForm
      inputs={inputs}
      editMode={editMode}
      inputChangeHandlers={inputChangeHandlers}
      handleSubmit={handleFormSubmit}
    />
  );
}

const mapStateToProps = (state, ownProps) => ({});

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
  return {
    ...stateProps,
    ...dispatchProps,
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

connect(mapStateToProps, mapDispatchToProps, mergeProps)(NumberQuestionForm);
