import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'hooks/useAction';
import {
  changeTitleInputValue,
  sendRequestToUpdateTest,
  getError,
  requestTestDeleting,
} from 'redux/actions/actionCreators';
import {
  getCurrentTestId,
  getTestTitleEditingInput,
} from 'redux/selectors/test';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import List from 'components/List/List';
import ModalDialog from 'components/ModalDialog/ModalDialog';

// Edit test title or delete test
export default function EditTestInfo() {
  const testId = useSelector(getCurrentTestId);
  const titleEditInput = useSelector(getTestTitleEditingInput);

  const inputChangeAction = useAction(changeTitleInputValue);
  const requestToUpdateTestAction = useAction(sendRequestToUpdateTest);
  const showMessage = useAction(getError);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalDialogClose = useCallback(() => setIsModalOpen(false), []);

  const handleInputChange = useCallback(
    (e) => inputChangeAction(e.target.value),
    [inputChangeAction]
  );

  const deleteTestAction = useAction(requestTestDeleting);

  const deleteTest = useCallback(() => deleteTestAction(testId), [
    deleteTestAction,
    testId,
  ]);

  const handleTestDeleting = useCallback(() => setIsModalOpen(true), []);

  const handleTestTitleUpdating = useCallback(() => {
    if (!titleEditInput.value.trim()) {
      showMessage('Enter title!');
    }

    requestToUpdateTestAction(testId, {
      title: titleEditInput.value.trim(),
    });
  }, [requestToUpdateTestAction, showMessage, testId, titleEditInput.value]);

  return (
    <>
      {isModalOpen && (
        <ModalDialog header="Delete test ?" onClose={handleModalDialogClose}>
          <Button onClick={deleteTest}>Yes</Button>
        </ModalDialog>
      )}
      <List vertical centered>
        <TextInput
          label="Title"
          value={titleEditInput.value}
          onChange={handleInputChange}
        />
        <List centered>
          <Button onClick={handleTestTitleUpdating}>Save title</Button>
          <Button dangerous onClick={handleTestDeleting}>
            Delete test
          </Button>
        </List>
      </List>
    </>
  );
}
