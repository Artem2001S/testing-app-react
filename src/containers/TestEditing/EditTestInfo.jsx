import React from 'react';
import { connect } from 'react-redux';
import {
  changeTitleInputValue,
  sendRequestToUpdateTest,
  getError,
  openModalDialog,
  requestTestDeleting,
} from 'redux/actions/actionCreators';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';
import List from 'components/List/List';
import { getTest } from 'redux/selectors/test';

// Edit test title or delete test
function EditTestInfo({
  input,
  onDelete,
  changeInputValue,
  onTestTitleUpdate,
}) {
  return (
    <List vertical centered>
      <TextInput
        label="Title"
        value={input.value}
        onChange={changeInputValue}
      />
      <List centered>
        <Button onClick={onTestTitleUpdate}>Save title</Button>
        <Button dangerous onClick={onDelete}>
          Delete test
        </Button>
      </List>
    </List>
  );
}

const mapStateToProps = (state) => ({
  input: state.testEditingPage.inputsData.titleEditing,
  testId: getTest(state).id,
});

const mapDispatchToProps = (dispatch) => ({
  changeInputValue: (e) => dispatch(changeTitleInputValue(e.target.value)),
  putError: (message) => dispatch(getError(message)),
  onDelete: (id) =>
    dispatch(
      openModalDialog('Delete test ?', () => dispatch(requestTestDeleting(id)))
    ),
  requestToUpdateTest: (id, data) =>
    dispatch(sendRequestToUpdateTest(id, data)),
});

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
    onTestTitleUpdate: () => {
      if (!stateProps.input.value.trim()) {
        dispatchProps.putError('Enter title!');
        return;
      }

      dispatchProps.requestToUpdateTest(stateProps.testId, {
        title: stateProps.input.value.trim(),
      });
    },
    onDelete: () => dispatchProps.onDelete(stateProps.testId),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditTestInfo);
