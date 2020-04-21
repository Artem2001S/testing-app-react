import React from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/DropDown/DropDown';
import List from 'components/List/List';
import Button from 'components/UIElements/Button/Button';

export default function AddQuestionForm({
  questionTypes,
  current,
  onChangeQuestionType,
}) {
  return (
    <List centered vertical>
      <DropDown
        items={questionTypes}
        current={current}
        onChange={onChangeQuestionType}
        label="Choose the question type"
      />
      <Button>Add</Button>
    </List>
  );
}

AddQuestionForm.propTypes = {
  questionTypes: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  onChangeQuestionType: PropTypes.func.isRequired,
};
