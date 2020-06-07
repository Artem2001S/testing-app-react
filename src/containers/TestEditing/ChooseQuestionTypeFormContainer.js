import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import ChooseQuestionTypeForm from 'components/ChooseQuestionTypeForm/ChooseQuestionTypeForm';
import { changeAddFormQuestionType } from 'redux/actions/actionCreators';
import NumericQuestionFormContainer from './NumericQuestionFormContainer';
import QuestionFormContainer from './QuestionFormContainer';
import { getSelectedQuestionType } from 'redux/selectors/test';
import { useAction } from 'hooks/useAction';
import ModalDialog from 'components/ModalDialog/ModalDialog';

export default function ChooseQuestionTypeFormContainer() {
  const selectedQuestionType = useSelector(getSelectedQuestionType);
  const [modalDialogContent, setModalDialogContent] = useState(null);

  const changeAddFormQuestionTypeAction = useAction(changeAddFormQuestionType);

  const handleCloseModal = useCallback(() => setModalDialogContent(null), [
    setModalDialogContent,
  ]);

  const handleAddClick = useCallback(() => {
    if (selectedQuestionType === 'number') {
      setModalDialogContent(
        <NumericQuestionFormContainer closeDialog={handleCloseModal} />
      );
    } else {
      setModalDialogContent(
        <QuestionFormContainer
          questionType={selectedQuestionType}
          closeDialog={handleCloseModal}
        />
      );
    }
  }, [handleCloseModal, selectedQuestionType]);

  return (
    <>
      {modalDialogContent && (
        <ModalDialog header="Add question" onClose={handleCloseModal}>
          {modalDialogContent}
        </ModalDialog>
      )}
      <ChooseQuestionTypeForm
        questionTypes={['single', 'multiple', 'number']}
        current={selectedQuestionType}
        onChangeQuestionType={changeAddFormQuestionTypeAction}
        onAddClick={handleAddClick}
      />
    </>
  );
}
