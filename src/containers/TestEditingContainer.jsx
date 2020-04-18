import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearLastAddedTestId } from 'redux/actions/actionCreators';

export function TestEditingContainer({ isAfterCreating }) {
  const params = useParams();
  const dispatch = useDispatch();

  const id = Number(params.id);

  useEffect(() => {
    if (isAfterCreating) {
      // delete lastTestAddedId from state
      dispatch(clearLastAddedTestId());
    }
  }, []);

  if (isNaN(id)) {
    return <h1>Incorrect ID</h1>;
  }

  return <div>Page {id}</div>;
}

const mapStateToProps = (state) => ({
  isAfterCreating: state.tests.lastTestAddedId !== -1,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TestEditingContainer);
