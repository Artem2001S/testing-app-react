import React from 'react';
import QuizContainer from 'containers/QuizContainer';
import withUserAuthentication from 'components/hoc/withUserAuthentication';

function QuizPage() {
  return <QuizContainer />;
}

export default withUserAuthentication(QuizPage);
