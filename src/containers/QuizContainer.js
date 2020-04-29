import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Quiz from 'components/Quiz/Quiz';
import { useParams } from 'react-router-dom';
import { requestTestFromQuizPage } from 'redux/actions/actionCreators';
import {
  getCurrentQuestionTitle,
  getCurrentTestQuestionsCount,
} from 'redux/selectors/quiz';

function QuizContainer({ requestTestFromServer, ...props }) {
  const { testId } = useParams();

  useEffect(() => {
    if (!isNaN(testId)) {
      requestTestFromServer(testId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Quiz {...props} />;
}

const mapStateToProps = (state) => ({
  currentQuestionNumber: state.quiz.currentQuestionIndex + 1,
  questionTitle: getCurrentQuestionTitle(state),
  questionsCount: getCurrentTestQuestionsCount(state),
  answerInputs: state.quiz.answerInputs,
});

const mapDispatchToProps = (dispatch) => ({
  requestTestFromServer: (testId) => dispatch(requestTestFromQuizPage(testId)),
});

const mergeProps = (stateProps, dispatchProps) => {
  return {
    ...stateProps,
    ...dispatchProps,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(QuizContainer);
