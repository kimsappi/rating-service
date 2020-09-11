import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import userReducer from './reducers/user';
import allUsersReducer from './reducers/allUsers';

const reducer = combineReducers({
  user: userReducer,
  allUsers: allUsersReducer
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk)
  )
);

if (process.env.NODE_ENV === 'production')
  console.log = console.warn = console.error = {};

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
