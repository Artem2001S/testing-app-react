import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/rootReducer';
import { rootSaga } from 'redux/sagas/rootSaga';
import {
  closeModalDialog,
  sendGetCurrentUserRequest,
} from './actions/actionCreators';

const sagaMiddleware = createSagaMiddleware();
const LOCAL_STORAGE_KEY = 'redux-store';

const preloadedState =
  JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || {};

const store = createStore(
  rootReducer,
  preloadedState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

store.subscribe(() => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(store.getState()));
});

// close modal dialog
store.dispatch(closeModalDialog());

sagaMiddleware.run(rootSaga);

// user authentication
store.dispatch(sendGetCurrentUserRequest());

export default store;
