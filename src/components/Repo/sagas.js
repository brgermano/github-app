import { takeLatest, call, put } from 'redux-saga/effects';
import CallApi from '../CallApi';
import { REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE } from './actions';

function* RepoRequestSaga(params) {
  const { params: repoName, requestType, finalSearchTerm } = params;

  try {
    const RepoRequest = requestType === 'get' ? 
    yield call(CallApi, 'get', `/repos/reactjs/${repoName}/commits`) 
    : yield call(CallApi, 'get', `/search/commits?q=repo:reactjs/${repoName}&q=${finalSearchTerm}+message`);

    const RepoData = requestType === 'get' ? 
    RepoRequest.data.slice(0, 20)
    : RepoRequest.data.items.slice(0, 20);

    const commitDetails = RepoData.map(
      commitDetails => (
        { commitMessage: commitDetails.commit.message, 
          authorName: commitDetails.commit.author.name, 
          authorEmail: commitDetails.commit.author.email }));

    yield put({
      type: REPO_SUCCESS,
      commitDetails
    });
  } catch (error) {
    yield put({
      type: REPO_FAILURE
    });
  }
}

export default function* RepoSaga() {
  yield takeLatest(REPO_REQUEST, RepoRequestSaga);
}
