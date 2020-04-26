import { all } from 'redux-saga/effects';
import { watchUser } from './userSaga';
import { watchTest } from './testSaga';
import { watchQuestion } from './questionSaga';
import { watchAnswer } from './answerSaga';

export function* rootSaga() {
  yield all([watchUser(), watchTest(), watchQuestion(), watchAnswer()]);
}
