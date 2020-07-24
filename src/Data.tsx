import React, { useEffect } from 'react';
import mapData from './mapData.json';

function Data() {
  const loadCoords = () => {
    const loadedCoords = localStorage.getItem('coords');
    console.log(loadedCoords);
  };

  // const saveCoords = (obj: any) => {
  //   localStorage.setItem('coords', JSON.stringify(obj));
  // };

  // const handleGeoSuccess = (position: any) => {
  //   const latitude = position.coords.latitude;
  //   const longitude = position.coords.longitude;
  //   const coordObj = {
  //     latitude: latitude,
  //     longitude: longitude,
  //   };
  //   saveCoords(coordObj);
  // };

  // const handleGeoError = () => {
  //   console.log('error');
  // };

  // const askForCoords = () => {
  //   navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  // };

  useEffect(() => {
    //askForCoords();
    loadCoords();
  });

  return (
    <div>
      <div className="header">
        <h1>코로나 지수 알리미</h1>
      </div>

      <p>{mapData.data[0].address}</p>
    </div>
  );
}

export default Data;
