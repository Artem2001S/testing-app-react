import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const useAction = (actionCreator) => {
  const dispatch = useDispatch();

  const handler = useCallback((...attrs) => dispatch(actionCreator(...attrs)), [
    actionCreator,
    dispatch,
  ]);

  return handler;
};
