import React from 'react';
import PropTypes from 'prop-types';
import DropDown from 'components/DropDown/DropDown';
import List from 'components/List/List';
import Button from 'components/UIElements/Button/Button';

export default function ChooseQuestionTypeForm({
  questionTypes,
  current,
  onChangeQuestionType,
  onAddClick,
}) {
  return (
    <List centered vertical>
      <DropDown
        label="Choose the question type"
        items={questionTypes}
        current={current}
        onChange={onChangeQuestionType}
      />
      <Button handleClick={onAddClick}>Add</Button>
    </List>
  );
}

ChooseQuestionTypeForm.propTypes = {
  questionTypes: PropTypes.array.isRequired,
  current: PropTypes.string.isRequired,
  onChangeQuestionType: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
};
