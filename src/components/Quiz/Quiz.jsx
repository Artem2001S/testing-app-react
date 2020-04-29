import React from 'react';
import PropTypes from 'prop-types';
import classes from './Quiz.module.scss';
import QuizQuestion from './QuizQuestion/QuizQuestion';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import RadioButton from 'components/UIElements/RadioButton/RadioButton';
import Button from 'components/UIElements/Button/Button';

export default function Quiz({
  questionTitle,
  currentQuestionNumber,
  isFinished,
  questionsCount,
  inputChangeHandlers,
  answerInputs,
  onNext,
  onFinishQuiz,
}) {
  if (isFinished) {
    return <h1>Test finished</h1>;
  }

  return (
    <div className={classes.QuizContainer}>
      <QuizQuestion
        questionTitle={questionTitle}
        questionsCount={questionsCount}
        currentQuestionNumber={currentQuestionNumber}
      />
      <div className={classes.Answers}>
        {answerInputs.map((input, index) => {
          switch (input.type) {
            case 'number':
              return (
                <TextInput
                  key={index}
                  handleChange={inputChangeHandlers[input.name]}
                  {...input}
                />
              );
            case 'radio':
              return (
                <RadioButton
                  key={index}
                  handleChange={inputChangeHandlers[input.name]}
                  {...input}
                />
              );
            case 'checkbox':
              return (
                <Checkbox
                  key={index}
                  handleChange={inputChangeHandlers[input.name]}
                  {...input}
                />
              );
            default:
              return <></>;
          }
        })}
      </div>
      <div className={classes.Actions}>
        <Button dangerous handleClick={onFinishQuiz}>
          Finish quiz
        </Button>
        <Button handleClick={onNext}>Next</Button>
      </div>
    </div>
  );
}

Quiz.propTypes = {
  questionTitle: PropTypes.string,
  questionsCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  currentQuestionNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  answerInputs: PropTypes.array.isRequired,
  onNext: PropTypes.func.isRequired,
};
