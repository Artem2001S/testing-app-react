import React from 'react';
import PropTypes from 'prop-types';
import List from 'components/List/List';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';

export default function AddNumberQuestionForm({
  inputs,
  inputChangeHandlers,
  editMode,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <List centered vertical>
        {inputs.map((input) => (
          <TextInput
            key={input.name}
            handleChange={inputChangeHandlers[input.name]}
            {...input}
          />
        ))}
        <Button handleClick={handleSubmit}>
          {editMode ? 'Save changes' : 'Add question'}
        </Button>
      </List>
    </form>
  );
}

AddNumberQuestionForm.propTypes = {
  inputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
  editMode: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
