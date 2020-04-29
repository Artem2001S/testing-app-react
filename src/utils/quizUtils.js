export function createInputsForAnswers(question) {
  if (!question) {
    return [];
  }

  const { question_type: questionType, answers } = question;

  if (questionType === 'number') {
    return [
      {
        type: 'number',
        name: 'quiz-input',
        label: 'Your answer:',
        value: '',
      },
    ];
  }

  const inputType = questionType === 'single' ? 'radio' : 'checkbox';

  const answerInputs = answers.map((answer) => ({
    type: inputType,
    label: answer.text,
    value: false,
    name: '' + answer.id,
  }));

  return answerInputs;
}

export function validateAnswer(question, answerInputs) {
  if (question.question_type === 'number') {
    const [input] = answerInputs;
    return Number(input.value) === Number(question.answer);
  }

  for (let index = 0; index < answerInputs.length; index++) {
    const input = answerInputs[index];
    const answer = question.answers[index];

    // if find mismatch then return false
    if (input.value !== answer.is_right) {
      return false;
    }
  }

  // return true - everything matched
  return true;
}
