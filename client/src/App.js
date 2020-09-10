import React, { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import './App.css';

import Header from './views/Header';
import Index from './views/Index';
import Auth from './views/Auth';
import AddResult from './views/AddResult';
import Profile from './views/Profile';
import ApiReturn from './views/ApiReturn';

import { checkUserLoginOnLoad } from './reducers/user';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // Checking if user is already logged in
  useEffect(() => {
    dispatch(checkUserLoginOnLoad(history));
  }, [dispatch, history])

  return (
    <>
      <Header />
      {
        process.env.NODE_ENV === 'development' &&
        <Alert variant='warning'>This is a development environment!</Alert>
      }
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/apiReturn' component={ApiReturn} />
        <Route path='/new' component={AddResult} />
        <Route path='/users/:id' component={Profile} />
        <Route path='/' component={Index} />
      </Switch>
    </>
  );
};

export default App;
