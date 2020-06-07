import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import List from 'components/List/List';
import QuestionListItem from 'components/QuestionListItem/QuestionListItem';
import { getCurrentTestQuestions } from 'redux/selectors/test';
import {
  sendRequestToDeleteQuestion,
  startNumericQuestionEditing,
  startQuestionEditing,
} from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';
import { useAction } from 'hooks/useAction';
import ModalDialog from 'components/ModalDialog/ModalDialog';

export default function QuestionList() {
  const questions = useSelector(getCurrentTestQuestions);
  const [modalDialogData, setModalDialogData] = useState(null);

  const deleteQuestionAction = useAction(sendRequestToDeleteQuestion);

  const handleQuestionDeleting = useCallback(
    (id) => {
      setModalDialogData({
        header: 'Delete question ?',
        successBtnText: 'Confirm',
        onSuccessBtnClick: () => deleteQuestionAction(id),
      });
    },
    [deleteQuestionAction]
  );

  const initNumericQuestionEditingForm = useAction(startNumericQuestionEditing);
  const initQuestionFormInputs = useAction(startQuestionEditing);

  const handleCloseModal = useCallback(() => setModalDialogData(null), []);

  const handleStartQuestionEditing = useCallback(
    (question) => {
      if (question.question_type === 'number') {
        initNumericQuestionEditingForm(
          question.id,
          question.title,
          question.answer
        );

        setModalDialogData({
          node: (
            <NumericQuestionFormContainer
              editMode
              closeDialog={handleCloseModal}
            />
          ),
          header: 'Edit question',
        });
      } else {
        setModalDialogData({
          node: (
            <QuestionFormContainer
              editMode
              questionType={question.question_type}
              closeDialog={handleCloseModal}
            />
          ),
          header: 'Edit question',
        });

        initQuestionFormInputs(question.id, question.title, question.answers);
      }
    },
    [handleCloseModal, initNumericQuestionEditingForm, initQuestionFormInputs]
  );

  return (
    <>
      {modalDialogData && (
        <ModalDialog
          header={modalDialogData.header}
          successBtnText={modalDialogData.successBtnText}
          onClose={handleCloseModal}
          onSuccessBtnClick={modalDialogData.onSuccessBtnClick}
        >
          {modalDialogData.node}
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
              onDelete={handleQuestionDeleting.bind(this, question.id)}
            />
          ))
        )}
      </List>
    </>
  );
}
