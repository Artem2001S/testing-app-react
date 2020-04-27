import React from 'react';
import { connect } from 'react-redux';
import Quiz from 'components/Quiz/Quiz';

function QuizContainer({ requestTest, ...props }) {
  return <Quiz {...props} />;
}

export default connect()(QuizContainer);
