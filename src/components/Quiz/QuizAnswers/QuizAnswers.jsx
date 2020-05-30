import React from 'react';
import PropTypes from 'prop-types';
import TextInput from 'components/UIElements/TextInput/TextInput';
import RadioButton from 'components/UIElements/RadioButton/RadioButton';
import Checkbox from 'components/UIElements/Checkbox/Checkbox';
import classes from './QuizAnswers.module.scss';

export default function QuizAnswers({ answerInputs, inputChangeHandlers }) {
  return (
    <div className={classes.Answers}>
      {answerInputs.map((input, index) => {
        switch (input.type) {
          case 'number':
            return (
              <TextInput
                key={index}
                onChange={inputChangeHandlers[input.name]}
                {...input}
              />
            );
          case 'radio':
            return (
              <RadioButton
                key={index}
                onChange={inputChangeHandlers[input.name]}
                {...input}
              />
            );
          case 'checkbox':
            return (
              <Checkbox
                key={index}
                onChange={inputChangeHandlers[input.name]}
                {...input}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

QuizAnswers.propTypes = {
  answerInputs: PropTypes.array.isRequired,
  inputChangeHandlers: PropTypes.object.isRequired,
};
