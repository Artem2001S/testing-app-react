import React from 'react';
import List from 'components/List/List';
import TextInput from 'components/UIElements/TextInput/TextInput';

export default function NumericQuestionForm({
  inputs,
  onFormSubmit,
  inputChangeHandlers,
}) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <List centered vertical>
        {inputs.map((input) => (
          <TextInput
            key={input.name}
            handleChange={inputChangeHandlers[input.name]}
            {...input}
          />
        ))}
      </List>
    </form>
  );
}
