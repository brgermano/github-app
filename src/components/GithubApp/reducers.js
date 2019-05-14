import { GITHUB_APP_REQUEST, GITHUB_APP_SUCCESS, GITHUB_APP_FAILURE } from './actions';

const app = (
  state = {
    data: {},
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
        data: state.data,
        status: {
          loading: true,
          failure: false
        }
      };
    case GITHUB_APP_SUCCESS: {
      return {
        data: action.payload,
        status: {
          loading: false,
          failure: false
        }
      };
    }
    case GITHUB_APP_FAILURE:
      return {
        data: state.data,
        status: {
          loading: false,
          failure: true
        }
      };
    default:
      return state;
  }
};
export default app;
