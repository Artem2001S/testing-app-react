export function createInputsForAnswers(question) {
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
