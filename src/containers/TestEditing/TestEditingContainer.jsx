import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  clearLastAddedTestId,
  requestTestInfo,
} from 'redux/actions/actionCreators';
import { getTest } from 'redux/selectors/test';

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

  return (
    <div>{test.id === -1 ? <div>Not found</div> : <div>{test.title}</div>}</div>
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
)(TestEditingContainer);
