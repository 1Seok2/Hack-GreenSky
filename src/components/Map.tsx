// global kakao
import React, { Component } from 'react';
import Patient from '../mapData.json';
import { Link } from 'react-router-dom';
import Data from './Data';
import { parse } from 'url';
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
    countInCircle : 0,
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

  today = new Date();
  year = this.today.getFullYear();
  month = this.today.getMonth() + 1;
  date = this.today.getDate();
  Months = (this.year%100 === 0 || this.year%4 === 0) && this.year%400 !== 0 ? 
            [31,28,31,30,31,30,31,31,30,31,30,31] :
            [31,29,31,30,31,30,31,31,30,31,30,31];

  isInFewDays = (_month : number, _date : number) : number=> {
    // 알고리즘 수정 요함
    let gap : number = 11;
    if(this.month === _month+1 ){
      gap = this.date + (this.Months[_month-1]-_date);
    } else if (this. month === _month){
      gap = this.date-_date;
    }
    return gap;
  }
  positionDistance = (lat : number, lng : number, _lat : number, _lng : number) : number => {
    let dis = 0;
    console.log("?",lat,_lat);
    let disLat : number = Math.abs(lat-_lat);
    let disLng = Math.abs(lng-_lng);
    console.log('dis ',disLat,disLng);
    dis = Math.sqrt(Math.pow((disLat%100 * 88804 + Math.floor((disLat-disLat%100)*100)*1480
          + (disLat*100-Math.floor(disLat*100))*24.668),2)
          + Math.pow((disLng%100 * 88804 + Math.floor((disLng-disLng%100)*100)*1480
          + (disLng*100-Math.floor(disLng*100))*24.668),2));
    return dis;
  }

  PatientInfo : Object[] = [];
  makeArrayPatient = () => {
    if(Patient.mapData) {
      Patient.data.map((value) => {
        let daysGap : number;
        daysGap = this.isInFewDays(value.month, value.day);
        if(daysGap <= 10){
          let sliced =  value.latlng.split(', ');
          let patient = {
            position : value.address,
            lat : parseFloat(sliced[0]),
            lng : parseFloat(sliced[1]),
            month : value.month,
            day : value.day
          }
          this.PatientInfo = [...this.PatientInfo, patient];
          console.log(daysGap);
          if(daysGap <= 1){
            this.makeMarkerInfected(patient, this.colorRed);
          } else if (1 < daysGap && daysGap <= 4){
            this.makeMarkerInfected(patient, this.colorOrg);
          } else if (4 < daysGap && daysGap <=9){
            this.makeMarkerInfected(patient, this.colorGrn);
          }

          let distance : number;
          distance = this.positionDistance(this.state.latitude,this.state.longitude,patient.lat,patient.lng);
          if(distance < 3600){
            this.AddCount();
          }
        }
      });
    }
  }
  AddCount = () => {
    this.setState({
      countInCircle : this.state.countInCircle + 1
    })
  }


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
        hi:"hello"
      };
      if (this.state.latitude !== 37.4882) saveCoords(coordObj);

      this.makeMarkerMyPos();

      this.makeArrayPatient();
    };
  }

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
      fillOpacity: 0.6, // 채우기 불투명도 입니다
    });

    // 지도에 원을 표시합니다
    circle.setMap(this.map);
  };

  colorRed = '#eb4d4b';
  colorOrg = '#f39c12';
  colorGrn = '#27ae60';
  //patient circles
  makeMarkerInfected = (_patient : any, color:string) => {
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(_patient.lat, _patient.lng), // 원의 중심좌표 입니다
      radius: 1200, // 미터 단위의 원의 반지름입니다
      strokeWeight: 1, // 선의 두께입니다
      strokeColor: `${color}`, // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: 'solid', // 선의 스타일 입니다
      fillColor: `${color}`, // 채우기 색깔입니다
      fillOpacity: 0.7, // 채우기 불투명도 입니다
    });
    
    // 지도에 원을 표시합니다
    circle.setMap(this.map);
  };
  btn_reload = () => {
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords === null) {
      console.log('nonal');
      window.location.reload();
    } else {
      console.log('already');
      const parsedCoords = JSON.parse(loadedCoords);
      this.setState({
        latitude : parsedCoords.lat,
        longitude : parsedCoords.lng
      });
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
      this.makeMarkerMyPos();

      this.makeArrayPatient();
    }
  }

  render() {
    return (
      <>
        <div id="map">
          <Data lat={this.state.latitude} 
                lng={this.state.longitude}
                patientNum={this.state.countInCircle}
          />
          <ul className="mapNav">
            <li>확진자 발생 추이</li>
            <li className="navGrn">🟢 5~9 일 사이</li>
            <li className="navOrg">🟠 2~4 일 사이</li>
            <li className="navRed">🔴 1일 이내</li>
          </ul>
          <a href="#" id="btn-reload" onClick={this.btn_reload}>◉</a>
        </div>
        {/* <InfectedMarker /> */}
      </>
    );
  }
}
export default Map;