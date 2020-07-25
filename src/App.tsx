import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Data from './components/Data';
import Map from './components/Map';

const App = () => {
  return (
    <BrowserRouter>
      <Route path="/data" exact component={Data} />
      <Route path="/" component={Map} />
    </BrowserRouter>
  );
};

export default App;