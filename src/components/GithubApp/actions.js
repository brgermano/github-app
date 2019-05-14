export const GITHUB_APP_REQUEST = 'GITHUB_APP_REQUEST';
export const GITHUB_APP_SUCCESS = 'GITHUB_APP_SUCCESS';
export const GITHUB_APP_FAILURE = 'GITHUB_APP_FAILURE';

export function GitHubAppRequestAction(params) {
  console.log('to aqui na action cretor')
  return { type: GITHUB_APP_REQUEST, params };
}
