import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useParams, Link, Redirect } from 'react-router-dom';
import {
  clearLastAddedTestId,
  requestTestInfo,
} from 'redux/actions/actionCreators';
import { useAction } from 'hooks/useAction';
import { getTest } from 'redux/selectors/test';
import EditTestInfo from './EditTestInfo';
import QuestionListContainer from './QuestionListContainer';
import ChooseQuestionTypeFormContainer from './ChooseQuestionTypeFormContainer';

// Main container
export default function TestEditingContainer() {
  const state = useStore().getState();
  const params = useParams();

  const id = Number(params.id);
  const test = getTest(state);
  const isAfterCreating = state.tests.lastTestAddedId !== -1;
  const isAuthorized = state.currentUserData.isAuthorized;

  const dispatchClearLastAddedTestId = useAction(clearLastAddedTestId);
  const dispatchRequestTestInfo = useAction(requestTestInfo);

  useEffect(() => {
    if (isAfterCreating) {
      // delete last testId added  from state
      dispatchClearLastAddedTestId();
    }

    // send request for getting test info
    if (!isNaN(id)) {
      dispatchRequestTestInfo(id);
    }
  }, [
    dispatchClearLastAddedTestId,
    dispatchRequestTestInfo,
    id,
    isAfterCreating,
  ]);

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
