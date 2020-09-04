import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Header from './views/Header/Header';
import Index from './views/Index/Index';
import Auth from './views/Auth';

const App = () => {
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
