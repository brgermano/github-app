import { combineReducers } from 'redux';
import githubapp from './components/GithubApp/reducers';
import repo from './components/Repo/reducers';

const rootReducer = combineReducers({
  githubapp,
  repo
});

export default rootReducer;
