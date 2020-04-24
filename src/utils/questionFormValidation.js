export function validateAnswers(inputs, questionType) {
  if (inputs.length < 2) return 'There must be at least 2 questions';

  const questionTypes = {
    multiple: 'multiple',
  };

  let rightAnswersCount = 0;

  for (let i = 0; i < inputs.length; i++) {
    const input = inputs[i];

    if (!input.value.trim()) {
      return 'Enter data in the input field';
    }

    if (input.isRight) {
      rightAnswersCount++;
    }
  }

  if (rightAnswersCount === 0) {
    return 'Mark at least one question as correct';
  }

  if (rightAnswersCount > 1 && questionType !== questionTypes.multiple) {
    return 'Mark only one question as correct';
  }

  return '';
}
