import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Quiz from 'components/Quiz/Quiz';
import { useParams } from 'react-router-dom';
import { requestTestFromQuizPage } from 'redux/actions/actionCreators';

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

});

const mapDispatchToProps = (dispatch) => ({
  requestTestFromServer: (testId) => dispatch(requestTestFromQuizPage(testId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
