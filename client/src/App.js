import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './views/Header/Header';
import Index from './views/Index/Index';
import Auth from './views/Auth';
import AddResult from './views/AddResult';
import Profile from './views/Profile';
import ApiReturn from './views/ApiReturn';

import { checkUserLoginOnLoad } from './reducers/user';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  // Checking if user is already logged in
  useEffect(() => {
    dispatch(checkUserLoginOnLoad());
  }, [dispatch])

  return (
    <>
      <Header />
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
