import React, {useEffect, useState} from 'react';
import Map from './components/map/Map';
import './style/page.loader.scss'
import axios from "axios";
const App = () => {
  const [state, setState] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const getData = async () => {
      let result = null;

      try {
          result = (await axios.get("https://coroname.me/getdata")).data
      } catch (e) {
          console.error(e);
      } finally {
          result && setState(result);
          setLoading(false);
      }
  }

  useEffect( () => {
      getData();
  },[]);

  return (
      isLoading ?
          <div className="map-loader-container">
              <div className="map-loader"></div>
          </div>
          : <Map Patient={state} />
  );
};

export default App;