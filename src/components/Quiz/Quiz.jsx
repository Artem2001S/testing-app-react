import React from 'react';
import PropTypes from 'prop-types';
import classes from './Quiz.module.scss';
import QuizQuestion from './QuizQuestion/QuizQuestion';
import TextInput from 'components/UIElements/TextInput/TextInput';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import RadioButton from 'components/UIElements/RadioButton/RadioButton';

export default function Quiz({
  questionTitle,
  currentQuestionNumber,
  questionsCount,
  answerInputs,
}) {
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
              return <TextInput key={index} {...input} />;
            case 'radio':
              return <RadioButton key={index} {...input} />;
            case 'checkbox':
              return <Checkbox key={index} {...input} />;
            default:
              return <></>;
          }
        })}
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
};
