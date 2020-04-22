import React from 'react';
import List from 'components/List/List';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Button from 'components/UIElements/Button/Button';

export default function NumericQuestionForm({
  inputs,
  inputChangeHandlers,
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
        <Button handleClick={handleSubmit}>Add</Button>
      </List>
    </form>
  );
}
