import React from 'react';
import { connect } from 'react-redux';
import {
  changeTitleInputValue,
  sendRequestToUpdateTest,
  getError,
} from 'redux/actions/actionCreators';
import TextInput from 'components/TextInput/TextInput';
import Button from 'components/Button/Button';
import List from 'components/List/List';
import { getTest } from 'redux/selectors/test';

function EditTestInfo({
  input,
  onDelete,
  changeInputValue,
  onTestTitleUpdate,
}) {
  return (
    <List vertical centered>
      <TextInput handleChange={changeInputValue} value={input.value} />
      <List centered>
        <Button handleClick={onTestTitleUpdate}>Save title</Button>
        <Button handleClick={onDelete}>Delete test</Button>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(EditTestInfo);
