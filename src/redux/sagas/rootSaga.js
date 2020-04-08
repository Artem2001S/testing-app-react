import { all } from 'redux-saga/effects';
import { watchUser } from './user';

export function* rootSaga() {
  yield all([watchUser()]);
}
