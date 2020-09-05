import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './views/Header/Header';
import Index from './views/Index/Index';
import Auth from './views/Auth';

import { checkUserLoginOnLoad } from './reducers/user';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  // Checking if user is already logged in
  useEffect(() => {
    dispatch(checkUserLoginOnLoad());
  }, [])

  return (
    <>
      <Header />
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' component={Index} />
      </Switch>
    </>
  );
};

export default App;
