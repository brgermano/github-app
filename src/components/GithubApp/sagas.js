import { takeLatest, call, put } from 'redux-saga/effects';
import CallApi from '../CallApi';
import { GITHUB_APP_REQUEST, GITHUB_APP_SUCCESS, GITHUB_APP_FAILURE } from './actions';

function* UserDetailRequestSaga() {
  try {
    const userDetailRequest = yield call(CallApi, 'get', '/users/reactjs');
    const userDetailData = userDetailRequest.data;

    const userReposRequest = yield call(CallApi, 'get', '/users/reactjs/repos');
    const userReposData = userReposRequest.data;

    yield put({
      type: GITHUB_APP_SUCCESS,
      userDetailData,
      userReposData
    });
  } catch (error) {
    yield put({
      type: GITHUB_APP_FAILURE
    });
  }
}

export default function* GithubSaga() {
  yield takeLatest(GITHUB_APP_REQUEST, UserDetailRequestSaga);
}
