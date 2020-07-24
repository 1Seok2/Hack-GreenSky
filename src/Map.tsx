// global kakao
import React, { Component } from 'react';
// import useGeolocation from './useGeolocation';

declare global {
  interface Window {
    kakao: any;
  }
}

class Map extends Component {
  state = {
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 37.4882,
    longitude: 127.1026,
    speed: null,
    timestamp: Date.now(),
    error: false,
  };
  mounted = true;
  //watchId: any;

  onEvent = (event: any) => {
    if (this.mounted) {
      this.setState({
        ...this.state,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
    }
  };
  onError = (error: any) => {
    this.setState({ ...this.state, error: error.message });
    console.log('error: ', error);
  };

  map: any;

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.onEvent, this.onError);
    //this.watchId = navigator.geolocation.watchPosition(this.onEvent, this.onError);
    const script = document.createElement('script');
    script.async = true;
    script.src =
      'https://dapi.kakao.com/v2/maps/sdk.js?appkey=791da7c461cd99413eb956eb82eadf43';
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        let container = document.getElementById('map');
        let options = {
          // center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          center: new window.kakao.maps.LatLng(
            this.state.latitude,
            this.state.longitude
          ),
          level: 8,
        };
        this.map = new window.kakao.maps.Map(container, options);
      });

      const saveCoords = (obj: any) => {
        localStorage.setItem('coords', JSON.stringify(obj));
      };

      const coordObj = {
        lat: this.state.latitude,
        lng: this.state.longitude,
      };
      if (this.state.latitude !== 37.4882) saveCoords(coordObj);

      this.makeMarkerMyPos();
      this.arrayInfected.map((value) =>
        this.makeMarkerInfected(value.lat, value.lng)
      );
    };
  }

  // displayMarker(_map : any, locPosition : any) {

  //     // 마커를 생성합니다
  //     var marker = new window.kakao.maps.Marker({
  //         map: _map,
  //         position: locPosition
  //     });

  //     var iwRemoveable = true;

  //     // 인포윈도우를 생성합니다
  //     var infowindow = new window.kakao.maps.InfoWindow({
  //         removable : iwRemoveable
  //     });

  //     // 인포윈도우를 마커위에 표시합니다
  //     infowindow.open(_map, marker);

  //     // 지도 중심좌표를 접속위치로 변경합니다
  //     _map.setCenter(locPosition);
  // }

  componentWillUnmount() {
    localStorage.removeItem('coords');
  }

  onClickPos = () => {
    localStorage.removeItem('coords');
    window.location.reload();
  };

  makeMarkerMyPos = () => {
    var markerPosition = new window.kakao.maps.LatLng(
      this.state.latitude,
      this.state.longitude
    );

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(this.map);

    // 지도에 표시할 원을 생성합니다
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(
        this.state.latitude,
        this.state.longitude
      ), // 원의 중심좌표 입니다
      radius: 2400, // 미터 단위의 원의 반지름입니다 , 대생활반경 4600 , 중생활반경 2400
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: '#75B8FA', // 선의 색깔입니다
      strokeOpacity: 1, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일 입니다
      fillColor: '#CFE7FF', // 채우기 색깔입니다
      fillOpacity: 0.4, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(this.map);
  };

  //patient circles
  makeMarkerInfected = (_lat: number, _lng: number) => {
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(_lat, _lng), // 원의 중심좌표 입니다
      radius: 50000, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: '#eb4d4b', // 선의 색깔입니다
      strokeOpacity: 0.4, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일 입니다
      fillColor: '#eb4d4b', // 채우기 색깔입니다
      fillOpacity: 0.4, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(this.map);
  };
  //sample array
  arrayInfected = [
    {
      lat: 33.450701,
      lng: 126.560667,
    },
    {
      lat: 33.450701,
      lng: 126.550667,
    },
    {
      lat: 33.450701,
      lng: 126.540667,
    },
    {
      lat: 33.450701,
      lng: 126.530667,
    },
  ];

  render() {
    return (
      <>
        <div id="map"></div>
        {/* <InfectedMarker /> */}
        <button onClick={this.onClickPos}>새 위치</button>
      </>
    );
  }
}
// declare global {
//     interface Window {
//       kakao: any;
//     }
// }

// const Map = () => {
//     const Geolocation = useGeolocation();

//     const MyLocation = {
//         lat: Geolocation.latitude,
//         lng: Geolocation.longitude,
//     };

//     console.log('myLoc: ', MyLocation);

//     useEffect(() => {

//         let container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
//         let options = { //지도를 생성할 때 필요한 기본 옵션
//           center: new window.kakao.maps.LatLng(MyLocation.lat, MyLocation.lng), //지도의 중심좌표.
//           level: 3 //지도의 레벨(확대, 축소 정도)
//         };

//         let map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

//     }, []);

//     return (
//         <>
//             {MyLocation.lat} / {MyLocation.lng}
//             <div id="map"></div>
//         </>
//     );
// }

export default Map;
