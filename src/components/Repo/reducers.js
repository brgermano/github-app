import { REPO_REQUEST, REPO_SUCCESS, REPO_FAILURE } from './actions';

const repo = (
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
    case REPO_REQUEST:
      return {
        data: state.data,
        status: {
          loading: true,
          failure: false
        }
      };
    case REPO_SUCCESS: {
      return {
        data: action.commitDetails,
        status: {
          loading: false,
          failure: false
        }
      };
    }
    case REPO_FAILURE:
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
export default repo;
