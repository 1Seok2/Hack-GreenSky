import React, { useEffect } from 'react';
import mapData from '../mapData.json';
import './Data.css';

function Data() {
  const loadCoords = () => {
    const loadedCoords = localStorage.getItem('coords');
  };

  const saveCoords = (obj: any) => {
    localStorage.setItem('coords', JSON.stringify(obj));
  };

  const handleGeoSuccess = (position: any) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordObj = {
      latitude: latitude,
      longitude: longitude,
    };
    saveCoords(coordObj);
  };

  const handleGeoError = () => {
    console.log('error');
  };

  const askForCoords = () => {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  };

  useEffect(() => {
    askForCoords();
    loadCoords();
  });

  return (
    <div className="dataContainer">
      <div className="header">
        <h1>코로나 지수 알리미</h1>
      </div>
      <div className="navBar">{/* nav bar */}</div>
      <div className="contents">
        <div>
          <span>😄</span>
          <p>쾌적</p>
        </div>
        <div>
          <p>현재위치 : {loadCoords}</p>
          <p>주변코로나환자수 : {/* 주변환자수 */}</p>
        </div>
      </div>
      <p>{mapData.data[0].address}</p>
    </div>
  );
}

export default Data;
