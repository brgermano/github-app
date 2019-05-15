import { GITHUB_APP_REQUEST, GITHUB_APP_SUCCESS, GITHUB_APP_FAILURE } from './actions';

const githubapp = (
  state = {
    userReposData: {},
    userDetailData: {},
    status: {
      loading: false,
      failure: false
    }
  },
  action
) => {
  switch (action.type) {
    case GITHUB_APP_REQUEST:
      return {
        userReposData: state.userReposData,
        userDetailData: state.userDetailData,
        status: {
          loading: true,
          failure: false
        }
      };
    case GITHUB_APP_SUCCESS: {
      return {
        userReposData: action.userReposData,
        userDetailData: action.userDetailData,
        status: {
          loading: false,
          failure: false
        }
      };
    }
    case GITHUB_APP_FAILURE:
      return {
        userReposData: state.userReposData,
        userDetailData: state.userDetailData,
        status: {
          loading: false,
          failure: true
        }
      };
    default:
      return state;
  }
};
export default githubapp;
