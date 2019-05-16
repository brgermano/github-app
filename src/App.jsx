import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import sagas from './sagas';
import rootReducer from './reducers';
import GithubApp from './components/GithubApp';
import Repo from './components/Repo';

/* eslint-disable comma-dangle */
const persistConfig = {
  key: 'root',
  storage
};
/* eslint-enable */

/* eslint-disable no-underscore-dangle */
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const sagaMiddleware = createSagaMiddleware();
const persistedReducer = persistReducer(persistConfig, rootReducer);
const middlewares = [sagaMiddleware, logger];
const store = createStore(persistedReducer, composeEnhancer(applyMiddleware(...middlewares)));
sagaMiddleware.run(sagas);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={GithubApp} />
            <Route exact path="/Repo" component={Repo} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
