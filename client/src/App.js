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
import AddResultFixedButton from './views/AddResultFIxedButton';

import { checkUserLoginOnLoad } from './reducers/user';
import { useDispatch, useSelector } from 'react-redux';

const App = () => {
  const user = useSelector(state => state.user);
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
        <Alert variant='warning'
          style={{textAlign: 'center'}}>
            This is a development environment!
        </Alert>
      }
      <div className='container'>
        <Switch>
          <Route path='/auth' component={Auth} />
          <Route path='/apiReturn' component={ApiReturn} />
          <Route path='/new' component={AddResult} />
          <Route path='/users/:id' component={Profile} />
          <Route path='/' component={Index} />
        </Switch>

        {user && <AddResultFixedButton />}
      </div>
    </>
  );
};

export default App;
