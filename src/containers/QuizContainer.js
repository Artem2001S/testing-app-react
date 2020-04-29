import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Quiz from 'components/Quiz/Quiz';
import { useParams, Link } from 'react-router-dom';
import {
  requestTestFromQuizPage,
  nextQuestion,
  finishQuiz,
  changeQuizAnswerInput,
} from 'redux/actions/actionCreators';
import {
  getCurrentQuestionTitle,
  getCurrentTestQuestionsCount,
} from 'redux/selectors/quiz';
import { createOnChangeHandlers } from 'utils';

function QuizContainer({
  requestTestFromServer,
  isNotFound,
  isLoading,
  ...props
}) {
  const { testId } = useParams();

  useEffect(() => {
    if (!isNaN(testId)) {
      requestTestFromServer(testId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <></>;
  }

  if (isNotFound) {
    return (
      <div>
        <h1>Test not found (or this quiz doesn't contain questions)</h1>
        <Link to="/dashboard">Open tests list</Link>
      </div>
    );
  }

  return <Quiz {...props} />;
}

const mapStateToProps = (state) => ({
  currentQuestionNumber: state.quiz.currentQuestionIndex + 1,
  questionTitle: getCurrentQuestionTitle(state),
  questionsCount: getCurrentTestQuestionsCount(state),
  answerInputs: state.quiz.answerInputs,
  isFinished: state.quiz.isFinished,
  correctAnswersCount: state.quiz.correctAnswersCount,
  isNotFound: state.quiz.questionsCount === 0,
  isLoading: state.UIData.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  requestTestFromServer: (testId) => dispatch(requestTestFromQuizPage(testId)),
  onNext: () => dispatch(nextQuestion()),
  onFinishQuiz: () => dispatch(finishQuiz()),
  handleInputChange: (inputName, inputType, e) => {
    if (inputType === 'checkbox' || inputType === 'radio') {
      dispatch(changeQuizAnswerInput(inputName, e.target.checked));
    } else {
      dispatch(changeQuizAnswerInput(inputName, e.target.value));
    }
  },
});

const mergeProps = (stateProps, dispatchProps) => {
  const inputChangeHandlers = createOnChangeHandlers(
    stateProps.answerInputs,
    dispatchProps.handleInputChange
  );

  return {
    ...stateProps,
    ...dispatchProps,
    inputChangeHandlers,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuizContainer);
