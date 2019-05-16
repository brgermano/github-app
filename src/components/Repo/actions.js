export const REPO_REQUEST = 'REPO_REQUEST';
export const REPO_SUCCESS = 'REPO_SUCCESS';
export const REPO_FAILURE = 'REPO_FAILURE';

export function RepoRequestAction(params, requestType, finalSearchTerm) {
  return {
    type: REPO_REQUEST, params, requestType, finalSearchTerm
  };
}
