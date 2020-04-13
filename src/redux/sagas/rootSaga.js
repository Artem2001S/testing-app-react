import { all } from 'redux-saga/effects';
import { watchUser } from './userSaga';
import { watchTest } from './testSaga';

export function* rootSaga() {
  yield all([watchUser(), watchTest()]);
}
