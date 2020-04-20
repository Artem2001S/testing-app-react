import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearLastAddedTestId,
  requestTestInfo,
} from 'redux/actions/actionCreators';
import { getTest } from 'redux/selectors/test';
import withUserAuthentication from 'components/hoc/withUserAuthentication';

export function TestEditingContainer({ isAfterCreating, test }) {
  const params = useParams();
  const dispatch = useDispatch();

  const id = Number(params.id);

  useEffect(() => {
    if (isAfterCreating) {
      // delete last test added Id from state
      dispatch(clearLastAddedTestId());
    }

    if (!isNaN(id)) {
      dispatch(requestTestInfo(id));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isNaN(id)) {
    return <h1>Incorrect ID</h1>;
  }

  if (!test) {
    return <h1>Loading data...</h1>;
  }

  return (
    <>{test.id === -1 ? <h1>Test not found</h1> : <div>{test.title}</div>}</>
  );
}

const mapStateToProps = (state) => ({
  isAfterCreating: state.tests.lastTestAddedId !== -1,
  test: getTest(state),
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withUserAuthentication(TestEditingContainer, true));
