import 'regenerator-runtime/runtime';
import { fork } from 'redux-saga/effects';
import GithubSaga from './components/GithubApp/sagas';
import RepoSaga from './components/Repo/sagas';

function* rootSaga() {
  yield fork(GithubSaga);
  yield fork(RepoSaga);
}

export default rootSaga;
