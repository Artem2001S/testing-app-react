import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAction } from 'hooks/useAction';
import {
  changeTitleInputValue,
  sendRequestToUpdateTest,
  getError,
  openModalDialog,
  requestTestDeleting,
} from 'redux/actions/actionCreators';
import {
  getCurrentTestId,
  getTestTitleEditingInput,
} from 'redux/selectors/test';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import List from 'components/List/List';

// Edit test title or delete test
export default function EditTestInfo() {
  const testId = useSelector(getCurrentTestId);
  const titleEditInput = useSelector(getTestTitleEditingInput);

  const inputChangeAction = useAction(changeTitleInputValue);
  const requestToUpdateTestAction = useAction(sendRequestToUpdateTest);
  const showMessage = useAction(getError);

  const handleInputChange = useCallback(
    (e) => inputChangeAction(e.target.value),
    [inputChangeAction]
  );

  const deleteTestAction = useAction(requestTestDeleting);
  const openModal = useAction(openModalDialog);

  const deleteTest = useCallback(() => deleteTestAction(testId), [
    deleteTestAction,
    testId,
  ]);

  const handleTestDeleting = useCallback(
    (id) => openModal('Delete test ?', deleteTest),
    [deleteTest, openModal]
  );

  const handleTestTitleUpdating = useCallback(() => {
    if (!titleEditInput.value.trim()) {
      showMessage('Enter title!');
    }

    requestToUpdateTestAction(testId, {
      title: titleEditInput.value.trim(),
    });
  }, [requestToUpdateTestAction, showMessage, testId, titleEditInput.value]);

  return (
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
  );
}

// const mapStateToProps = (state) => ({
//   // input: state.testEditingPage.inputsData.titleEditing,
//   // testId: getTest(state).id,
// });

// const mapDispatchToProps = (dispatch) => ({
//   changeInputValue: (e) => dispatch(changeTitleInputValue(e.target.value)),
//   putError: (message) => dispatch(getError(message)),
//   onDelete: (id) =>
//     dispatch(
//       openModalDialog('Delete test ?', () => dispatch(requestTestDeleting(id)))
//     ),
//   requestToUpdateTest: (id, data) =>
//     dispatch(sendRequestToUpdateTest(id, data)),
// });

// const mergeProps = (stateProps, dispatchProps) => {
//   return {
//     ...stateProps,
//     ...dispatchProps,
//     onTestTitleUpdate: () => {
//       if (!stateProps.input.value.trim()) {
//         dispatchProps.putError('Enter title!');
//         return;
//       }

//       dispatchProps.requestToUpdateTest(stateProps.testId, {
//         title: stateProps.input.value.trim(),
//       });
//     },
//     onDelete: () => dispatchProps.onDelete(stateProps.testId),
//   };
// };

// connect(
//   mapStateToProps,
//   mapDispatchToProps,
//   mergeProps
// )(EditTestInfo);
