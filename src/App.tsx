import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Main from './components/Main';
import Data from './components/Data';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact={true} path="/" component={Main} />
      <Route path="/data" component={Data} />
    </BrowserRouter>
  );
};

export default App;
