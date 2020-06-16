import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'hooks/useAction';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getCurrentTestQuestions } from 'redux/selectors/test';
import {
  sendRequestToDeleteQuestion,
  startNumericQuestionEditing,
  startQuestionEditing,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import List from 'components/List/List';
import QuestionFormContainer from './QuestionFormContainer';
import ModalDialog from 'components/ModalDialog/ModalDialog';
import Button from 'components/UIElements/Button/Button';

export default function QuestionList() {
  const questions = useSelector(getCurrentTestQuestions);

  const [questionType, setQuestionType] = useState(null);
  const [isQuestionEditingModalOpen, setIsQuestionEditingModalOpen] = useState(
    false
  );

  const [
    isDeletingQuestionModalOpen,
    setIsDeletingQuestionModalOpen,
  ] = useState(false);
  const [questionIdToNeedDelete, setQuestionIdToNeedDelete] = useState(null);

  const deleteQuestionAction = useAction(sendRequestToDeleteQuestion);

  // show modal dialog (question deleting)
  const handleShowQuestionDeletingDialog = useCallback((questionId) => {
    setIsDeletingQuestionModalOpen(true);
    // save question id
    setQuestionIdToNeedDelete(questionId);
  }, []);

  // delete question
  const handleDeleteQuestion = useCallback(() => {
    deleteQuestionAction(questionIdToNeedDelete);
    setIsDeletingQuestionModalOpen(false);
  }, [deleteQuestionAction, questionIdToNeedDelete]);

  const handleCloseQuestionDeletingDialog = useCallback(
    () => setIsDeletingQuestionModalOpen(false),
    []
  );

  const handleCloseQuestionEditingDialog = useCallback(
    () => setIsQuestionEditingModalOpen(false),
    []
  );

  const initNumericQuestionEditingForm = useAction(startNumericQuestionEditing);
  const initQuestionFormInputs = useAction(startQuestionEditing);

  const handleStartQuestionEditing = useCallback(
    (question) => {
      setQuestionType(question.question_type);
      if (question.question_type === 'number') {
        initNumericQuestionEditingForm(
          question.id,
          question.title,
          question.answer
        );
        setIsQuestionEditingModalOpen(true);
      } else {
        setIsQuestionEditingModalOpen(true);
        initQuestionFormInputs(question.id, question.title, question.answers);
      }
    },
    [initNumericQuestionEditingForm, initQuestionFormInputs]
  );

  return (
    <>
      {isQuestionEditingModalOpen && (
        <ModalDialog
          header={'Edit question'}
          onClose={handleCloseQuestionEditingDialog}
        >
          {questionType !== 'number' ? (
            <QuestionFormContainer
              editMode
              questionType={questionType}
              closeDialog={handleCloseQuestionEditingDialog}
            />
          ) : (
            <NumericQuestionFormContainer
              editMode
              closeDialog={handleCloseQuestionEditingDialog}
            />
          )}
        </ModalDialog>
      )}

      {isDeletingQuestionModalOpen && (
        <ModalDialog
          header="Delete question ?"
          onClose={handleCloseQuestionDeletingDialog}
        >
          <Button onClick={handleDeleteQuestion}>Yes</Button>
        </ModalDialog>
      )}
      <List vertical centered>
        {questions.length === 0 ? (
          <h3>Add the first question!</h3>
        ) : (
          questions.map((question, index) => (
            <QuestionListItem
              key={index}
              type={question.question_type}
              {...question}
              startQuestionEditing={handleStartQuestionEditing.bind(
                this,
                question
              )}
              onDelete={handleShowQuestionDeletingDialog.bind(
                this,
                question.id
              )}
            />
          ))
        )}
      </List>
    </>
  );
}
