export function updateInputsArray(inputs, inputName, newValue) {
  return inputs.map((input) =>
    input.name === inputName ? { ...input, value: newValue } : input
  );
}
