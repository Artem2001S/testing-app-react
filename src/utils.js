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
