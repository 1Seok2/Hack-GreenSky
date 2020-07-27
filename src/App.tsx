import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Data from './components/alami/Data';
import Map from './components/map/Map';

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route path="/" component={Map} />
    </HashRouter>
  );
};

export default App;