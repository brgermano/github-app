import 'regenerator-runtime/runtime';
import { fork } from 'redux-saga/effects';
import GithubSaga from './components/GithubApp/sagas';

function* rootSaga() {
  yield fork(GithubSaga);
}

export default rootSaga;
