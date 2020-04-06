export function updateInputsArray(inputs, inputName, newValue) {
  return inputs.map((input) =>
    input.name === inputName ? { ...input, value: newValue } : input
  );
}

export function createOnChangeHandlers(inputs, handler) {
  const handlers = {};

  inputs.forEach((input) => {
    handlers[input.name] = handler.bind(this, input.name);
  });

  return handlers;
}

export function validateInputs(inputs) {
  for (let index = 0; index < inputs.length; index++) {
    const input = inputs[index];

    if (input.value === '') {
      return `Enter blank field: ${input.label}`;
    }
  }
  return '';
}
