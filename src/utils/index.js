export function updateInputsArray(inputs, inputName, newValue, isRadioButtons) {
  // only one radio button should be checked
  if (isRadioButtons) {
    inputs = inputs.map((input) => ({ ...input, value: false }));
  }

  return inputs.map((input) =>
    input.name === inputName ? { ...input, value: newValue } : input
  );
}

export function createOnChangeHandlers(inputs, handler) {
  const handlers = {};

  inputs.forEach((input) => {
    handlers[input.name] = handler.bind(this, input.name, input.type || 'text');
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

export function validatePasswords(password, repeatedPassword) {
  if (password.length < 6) {
    return 'The password must contain 6 or more characters';
  }

  if (password !== repeatedPassword) {
    return "Passwords don't match";
  }

  return '';
}

export function validateRegistrationForm(inputs) {
  let validationStatus = validateInputs(inputs);

  if (validationStatus) {
    return validationStatus;
  }

  const password = inputs.filter((input) => input.name === '_password');
  const repeatedPassword = inputs.filter(
    (input) => input.name === 'repeated_password'
  );

  validationStatus = validatePasswords(
    password[0].value,
    repeatedPassword[0].value
  );

  return validationStatus;
}

export function convertTestObject(test) {
  const convertedTest = {
    ...test,
    createdAt: new Date(test.created_at).toLocaleString(),
    createdAtValue: new Date(test.created_at).valueOf(),
  };

  delete convertedTest.created_at;
  return convertedTest;
}
