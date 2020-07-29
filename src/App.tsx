import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Map from './components/map/Map';
// import NewMap from './components/map/NewMap';

const App = () => {
  return (
    <HashRouter basename={process.env.PUBLIC_URL}>
      <Route path="/" component={Map} />
      {/* <Route path="/" component={NewMap} /> */}
    </HashRouter>
  );
};

export default App;