import { all } from 'redux-saga/effects';
import { watchUser } from './userSaga';
import { watchTest } from './testSaga';
import { watchQuestion } from './questionSaga';

export function* rootSaga() {
  yield all([watchUser(), watchTest(), watchQuestion()]);
}
