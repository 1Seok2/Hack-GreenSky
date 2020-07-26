// global kakao
import React, { Component, useState, useEffect } from 'react';
import AlertModal from '../modal/alertModal';
import { Link } from 'react-router-dom';
import Patient from '../../InfectedData.json';
import MyLogoImg from '../../assets/slimgslogo.jpg';
import Data from '../alami/Data';
// import useGeolocation from './useGeolocation';

const API_KEY = process.env.REACT_APP_API_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}

//hooks
const Map = () => {
  const [state,setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
    timestamp: Date.now(),
    error: false,
  });
  const [stateAlami, setStateAlami] = useState({
    conditionFace : '',
    conditionState : '',
    conditionTxt : '위치 조정 해주세요',
    conditionBgColor : '#1289A7'
  });
  const [countInCircle,setCountInCircle] = useState(0);
  const [latitude, setLatitude] = useState(37.4882);
  const [longitude, setLongitude] = useState(127.1026);
  const [search,setSearch] = useState('검색할 주소');
  const [formState,setFormState] = useState('none');
  const mounted = true;

  const onEvent = (event: any) => {
    if (mounted) {
      setState({
        ...state,
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        speed: event.coords.speed,
        timestamp: event.timestamp,
      });
      setLatitude(event.coords.latitude);
      setLongitude(event.coords.longitude);
    }
  };
  const onError = (error: any) => {
    setState({ ...state, error: error.message });
    console.log('error: ', error);
  };
  let map: any;

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const Months = (year%100 === 0 || year%4 === 0) && year%400 !== 0 ? 
            [31,28,31,30,31,30,31,31,30,31,30,31] :
            [31,29,31,30,31,30,31,31,30,31,30,31];

  const isInFewDays = (_month : number, _date : number) : number=> {
    // 알고리즘 수정 요함
    let gap : number = 11;
    if(month === _month+1 ){
      gap = date + (Months[_month-1]-_date);
    } else if (month === _month){
      gap = date-_date;
    }
    return gap;
  }

  const positionDistance = (lat : number, lng : number, _lat : number, _lng : number) : number => {
    let dis = 0;
    let disLat : number = Math.abs(lat-_lat);
    let disLng = Math.abs(lng-_lng);
    dis = Math.sqrt(Math.pow((disLat%100 * 88804 + Math.floor((disLat-disLat%100)*100)*1480
          + (disLat*100-Math.floor(disLat*100))*24.668),2)
          + Math.pow((disLng%100 * 88804 + Math.floor((disLng-disLng%100)*100)*1480
          + (disLng*100-Math.floor(disLng*100))*24.668),2));
    return dis;
  }

  const makeArrayPatient = () => {
    let PatientInfo : Object[] = [];
    if(Patient.mapData) {
      Patient.data.map((value) => {
        let daysGap : number;
        daysGap = isInFewDays(value.month, value.day);
        if(daysGap <= 10){
          let sliced =  value.latlng.split(', ');
          let patient = {
            position : value.address,
            lat : parseFloat(sliced[0]),
            lng : parseFloat(sliced[1]),
            month : value.month,
            day : value.day
          }
          PatientInfo = [...PatientInfo, patient];
          if(daysGap <= 1){
            makeMarkerInfected(patient, colorRed);
          } else if (1 < daysGap && daysGap <= 4){
            makeMarkerInfected(patient, colorOrg);
          } else if (4 < daysGap && daysGap <=9){
            makeMarkerInfected(patient, colorGrn);
          }

          let distance : number;
          distance = positionDistance(latitude,longitude,patient.lat,patient.lng);
          if(distance < 3600){
            console.log("paInfo : ",patient.lat,patient.lng,distance);
            AddCount();
          }
        }
      });
    }
  }

  const AddCount = () => {
    setCountInCircle((prevCount) => prevCount+1);
  }

  const makeMarkerMyPos = () => {
    var markerPosition = new window.kakao.maps.LatLng(
      latitude,
      longitude
    );

    // 마커를 생성합니다
    var marker = new window.kakao.maps.Marker({
      position: markerPosition,
    });

    // 마커가 지도 위에 표시되도록 설정합니다
    marker.setMap(map);
    // 지도에 표시할 원을 생성합니다
    var circle = new window.kakao.maps.Circle({
      center: new window.kakao.maps.LatLng(
        latitude,
        longitude
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
    circle.setMap(map);
  };

  const colorRed = '#eb4d4b';
  const colorOrg = '#f39c12';
  const colorGrn = '#27ae60';
  //patient circles
  const makeMarkerInfected = (_patient : any, color:string) => {
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
    circle.setMap(map);
  };

  const btn_reload = () => {
    init();
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords === null) {
      console.log('nonal');
      window.location.reload();
    } else {
      console.log('already');
      const parsedCoords = JSON.parse(loadedCoords);
      setLatitude(parsedCoords.lat);
      setLongitude(parsedCoords.lng);
      setCountInCircle(0);
      window.kakao.maps.load(() => {
        DeleteMapElements();
        let container = document.getElementById('map');
        let options = {
          center: new window.kakao.maps.LatLng(
            latitude,
            longitude
          ),
          level: 8,
        };
        console.log('map render2');
        map = new window.kakao.maps.Map(container, options);
        let geocoder = new window.kakao.maps.services.Geocoder();

        const searchAddrFromCoords = (coords : any, callback : any) : void=> {
          // 좌표로 행정동 주소 정보를 요청합니다
          geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
        }
        const displayCenterInfo = (result : any, status : any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            var infoDiv : any = document.getElementById('centerAddr');
            for(var i = 0; i < result.length; i++) {
              // 행정동의 region_type 값은 'H' 이므로
              if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
              }
            }
          }    
        }
        // 현재 지도 중심좌표로 주소를 검색해서 상단에 표시합니다
        searchAddrFromCoords(map.getCenter(), displayCenterInfo);

      
      });
      makeMarkerMyPos();

      makeArrayPatient();
    }
  }

  const btn_search = () => {
    const form : any= document.querySelector('.form-search');
    if(formState === 'none'){
      form.classList.remove('none');
      form.classList.add('show');
      setFormState('show');
      alert(`지역 검색은 가능하지만 코로나 맵은 보지 못하기에 아직 미완성인 기능입니다.`);
    } else {
      form.classList.remove('show');
      form.classList.add('none');
      setFormState('none');
    }
  }

  const onChangeSearch = (e : any) =>{
    setSearch(e.target.value);
  }

  const onSubmitForm = (e : any) => {
    e.preventDefault();

    DeleteMapElements();
    var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
      mapOption = {
          center: new window.kakao.maps.LatLng(longitude, latitude), // 지도의 중심좌표
          level: 4 // 지도의 확대 레벨
      };  

    // 지도를 생성합니다    
    var map = new window.kakao.maps.Map(mapContainer, mapOption); 

    let geocoder : any= new window.kakao.maps.services.Geocoder();
    console.log('make pat');
    makeArrayPatient();

    geocoder.addressSearch(search, function(result : any, status : any) {

      // 정상적으로 검색이 완료됐으면 
      if (status === window.kakao.maps.services.Status.OK) {
        var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        var marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });

        // 인포윈도우로 장소에 대한 설명을 표시합니다
        var infowindow = new window.kakao.maps.InfoWindow({
          content: search
        });
        infowindow.open(map, marker);

        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
        map.setCenter(coords);
      } 
    });
    setCountInCircle(0);
    makeArrayPatient();
    console.log('maked');
  }
  
  const DeleteMapElements = () => {
    let deleteMap : any = document.getElementById("map");
    while ( deleteMap.hasChildNodes() ) { deleteMap.removeChild( deleteMap.firstChild ); }
  }

  const init = () => {
    const Container : any = document.getElementById('dataContainer');
    if(countInCircle < 1){
      setStateAlami({
        conditionState : 'good',
        conditionTxt : '좋음',
        conditionFace : 'icon-smile',
        conditionBgColor : '#1289A7'
      });
    } else if ( 1 <= countInCircle && countInCircle <=2 ){
      setStateAlami({
        conditionState : 'soso',
        conditionTxt : '조금 위험',
        conditionFace : 'icon-meh',
        conditionBgColor : '#009432'
      });
    } else if ( 3 <= countInCircle && countInCircle <= 5 ){
      setStateAlami({
        conditionState : 'bad',
        conditionTxt : '위험',
        conditionFace : 'icon-frown',
        conditionBgColor : '#cc8e35'
      });
    } else if ( 6<= countInCircle ) {
      setStateAlami({
        conditionState : 'terr',
        conditionTxt : '매우 위험',
        conditionFace : 'icon-emo-devil',
        conditionBgColor : '#b33939'
      });
    }
    Container.style.backgroundColor = stateAlami.conditionBgColor;
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onError);
    
    //this.watchId = navigator.geolocation.watchPosition(this.onEvent, this.onError);
    const script = document.createElement('script');
    script.async = true;
    script.src =
      `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${API_KEY}`;
    document.head.appendChild(script);
    
    
    script.onload = () => {
      window.kakao.maps.load(() => {
        DeleteMapElements();
        let container : any= document.getElementById('map');

        let options = {
          // center: new window.kakao.maps.LatLng(37.506502, 127.053617),
          center: new window.kakao.maps.LatLng(
            latitude,
            longitude
          ),
          level: 8,
        };
        console.log('map render1');
        map = new window.kakao.maps.Map(container, options);
      });

      const saveCoords = (obj: any) => {
        localStorage.setItem('coords', JSON.stringify(obj));
      };

      const coordObj = {
        lat: latitude,
        lng: longitude,
      };
      if (latitude !== 37.4882) saveCoords(coordObj);

      makeMarkerMyPos();

      makeArrayPatient();
    };
    init();
    return(() =>{
      DeleteMapElements()
    });
  }, [latitude, longitude]);

  return (
    <>
      <div id="map">
      </div>
      <div className="options">
        <Data lat={latitude} 
              lng={longitude}
              patientNum={countInCircle}
              alami={stateAlami}
              bgColor={stateAlami.conditionBgColor}
        />
        <ul className="mapNav">
          <li>확진자 발생 추이</li>
          <li className="navGrn">🟢 5~9 일 사이</li>
          <li className="navOrg">🟠 2~4 일 사이</li>
          <li className="navRed">🔴 1일 이내</li>
        </ul>
        <form className="form-search none" onSubmit={onSubmitForm}>
          <input type="text" value={search} onChange={onChangeSearch}/>
        </form>
        <a href="#" className="btn" id="btn-search" onClick={btn_search}><i className="icon-search"></i></a>
        <a href="#" className="btn" id="btn-reload" onClick={btn_reload}><i className="icon-location"></i></a>
      </div>
      <AlertModal idNum={0} contents={[
                            "위치 조정 후 우측 하단의 알리미 버튼으로 위험도 볼 수 있습니다",
                            "좌측 상단의 원들은 확진 판정 받은 환자가",
                            "며칠 전에 어디서 판정 받았는지를 나타냅니다"]}/>
      <AlertModal idNum={1} contents={[
                            "위치를 잡느라 좀 애먹고 있어요 😭",
                            "좌측 하단의 현위치 버튼을 천천히 4~5번 이상 눌러주세요",
                            "누를수록 위치를 빨리 찾습니다",
                            "위치상 약간의 오차가 있을 수 있습니다"]}/>
      <div className="nav-bottom">
        <img id="mylogo" src={MyLogoImg} alt="logo"/>
      </div>
      {/* <InfectedMarker /> */}
    </>
  );
}
export default Map;