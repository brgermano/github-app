import { takeEvery, call, put } from 'redux-saga/effects';
import CallApi from '../CallApi';
import { GITHUB_APP_REQUEST, GITHUB_APP_SUCCESS, GITHUB_APP_FAILURE } from './actions';

export function* GithubRequestSaga(params) {
  console.log('de boas na saga')
  try {
    const GithubCall = yield call(CallApi, 'get', 'https://api.github.com/users/brgermano');
    console.log('data', GithubCall.data)
    const GithubData = GithubCall ? GithubCall.data : false;

    yield put({
      type: GITHUB_APP_SUCCESS,
      payload: GithubData
    });
  } catch (error) {
    yield put({
      type: GITHUB_APP_FAILURE
    });
  }
}

export default function* GithubSaga() {
  yield takeEvery(GITHUB_APP_REQUEST, GithubRequestSaga);
}
