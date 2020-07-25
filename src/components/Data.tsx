import React, { Component } from 'react';
import Patient from '../mapData.json';
import { Link } from 'react-router-dom';
import Map from './Map';
import './Data.css';

// interface DataType {
//   condition : string,
//   currentAddress : string,
//   loadedCoords : any,
//   count : number
// }

class Data extends Component {
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
    condition : '',
    currentAddress : '',
    loadedCoords : {
      lat : 0,
      lng : 0
    },
    countInCircle : 0
  };
  mounted = true;
  //watchId: any;
  saveCoords = (coordsObj : any) => {
    localStorage.setItem('coords', JSON.stringify(coordsObj));
  }

  onEvent = (event: any) => {
    const lati = event.coords.latitude;
    const long = event.coords.longitude;
    const coordsObj = {
      latitude : lati,
      longitude : long
    };
    this.saveCoords(coordsObj);
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
  

  loadCoords = () => {
    this.setState({
      loadedCoords : localStorage.getItem('coords')
    });
  };
  

  componentDidMount(){
    this.loadCoords();
    this.makeArrayPatient();
    navigator.geolocation.getCurrentPosition(this.onEvent, this.onError);
    //this.watchId = navigator.geolocation.watchPosition(this.onEvent, this.onError);
    // this.setState({
    //   loadedCoords : {
    //     lat : this.state.latitude,
    //     lng : this.state.longitude
    //   },
    // })
    // this.coordtoAddress();
  }

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
          console.log('laln ',patient.lat,patient.lng);
          const local : any= localStorage.getItem('coords');
          const parsedCoords = JSON.parse(local);
          let distance : number;
          if(parsedCoords.latitude === undefined) {
            console.log('not upd');
            distance = this.positionDistance(this.state.latitude,this.state.longitude,patient.lat,patient.lng);
          } else {
            console.log('yes udt');
            distance = this.positionDistance(parseFloat(parsedCoords.latitude),parseFloat(parsedCoords.longitude),patient.lat,patient.lng);
          }
          
          if(distance < 2400){
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

  onClickPos = () => {
    localStorage.removeItem('coords');
    window.location.reload();
  };
  getCurrentAddress = () => {
    const Addr = (addr :any) => {
      this.setState({
        currentAddress : addr
      })
    }
    var geocoder = new window.kakao.maps.services.Geocoder();
    function searchDetailAddrFromCoords(coords : any, callback : any) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
    searchDetailAddrFromCoords(null, function(result : any, status : any) {
      if (status === window.kakao.maps.services.Status.OK) {
          var detailAddr : any= !!result[0].road_address ? '도로명주소 : ' + result[0].road_address.address_name : '';
          detailAddr += '지번 주소 : ' + result[0].address.address_name;
          
          // var content = '<div class="bAddr">' +
          //                 '<span class="title">법정동 주소정보</span>' + 
          //                 detailAddr + 
          //             '</div>';

          // // 마커를 클릭한 위치에 표시합니다 
          // marker.setPosition(mouseEvent.latLng);
          // marker.setMap(map);

          // // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          // infowindow.setContent(content);
          // infowindow.open(map, marker);
          Addr(detailAddr);
      }   
    });
  }

  render(){
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
            <p>현재위치 : {this.state.currentAddress}</p>
            <p>주변 코로나환자수 :  {this.state.countInCircle}</p>
          </div>
        </div>
        <Link to="/" className="btn-back">MAP</Link>
        <div id="btn-reload" onClick={this.onClickPos}>◉</div>
      </div>
    );
  }
}

export default Data;