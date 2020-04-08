import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'redux/rootReducer';
import { rootSaga } from 'redux/sagas/rootSaga';
import { sendRegistrationRequest } from './actions/actionCreators';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

sagaMiddleware.run(rootSaga);

store.dispatch(
  sendRegistrationRequest({
    username: '002',
    password: '123456',
    isAdmin: false,
  })
);

export default store;
