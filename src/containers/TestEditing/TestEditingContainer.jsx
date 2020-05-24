import React, { useEffect } from 'react';
import { connect, useDispatch, useStore } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  clearLastAddedTestId,
  requestTestInfo,
} from 'redux/actions/actionCreators';
import { getTest } from 'redux/selectors/test';
import EditTestInfo from './EditTestInfo';
import QuestionListContainer from './QuestionListContainer';
import ChooseQuestionTypeFormContainer from './ChooseQuestionTypeFormContainer';

// Main container
function TestEditingContainer() {
  const state = useStore().getState();
  const dispatch = useDispatch();
  const params = useParams();

  const id = Number(params.id);
  const test = getTest(state);
  const isAfterCreating = state.tests.lastTestAddedId !== -1;
  const isAuthorized = state.currentUserData.isAuthorized;

  useEffect(() => {
    if (isAfterCreating) {
      // delete last testId added  from state
      dispatch(clearLastAddedTestId());
    }

    // send request for getting test info
    if (!isNaN(id)) {
      dispatch(requestTestInfo(id));
    }
  }, [dispatch, id, isAfterCreating]);

  if (isNaN(id)) {
    return <h1>Incorrect ID</h1>;
  }

  if (!isAuthorized) {
    return <Redirect to="/" />;
  }

  if (!test) {
    return <h1>Loading data...</h1>;
  }

  return (
    <>
      {test.id === -1 ? (
        <>
          <h1>Test not found</h1>
          <h2>
            Go to: <Link to="/dashboard">dashboard</Link>
          </h2>
        </>
      ) : (
        <>
          <EditTestInfo />
          <ChooseQuestionTypeFormContainer />
          <QuestionListContainer />
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  isAfterCreating: state.tests.lastTestAddedId !== -1,
  test: getTest(state),
});

export default connect(mapStateToProps)(TestEditingContainer);
