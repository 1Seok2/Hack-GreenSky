// global kakao
import React, { useState, useEffect } from 'react';
import NavBottom from '../navigation/NavBottom';
import PositionDistance from './marker/patient/PositionDistance';
import Patient from '../../InfectedData.json';
import Data from '../alami/Data';
import '../../style/search_kakao.css';
import '../../style/fontello-6de7bc38/css/mapticon-embedded.css';
import DateGapAcumulator from './marker/patient/DayGapAcumulator';
import SearchPlaces from './api/SearchPlaces';
import MakeMarkerInfected from './marker/MakeMarkerInfected';
import MakeMarkerMyPosition from './marker/MakeMarkerMyPosition';
import MapNav from './compose/MapNav';
import AddMarker from './marker/AddMarker';
import SearchLists from './compose/SearchLists';


const API_KEY = process.env.REACT_APP_API_KEY;

declare global {
  interface Window {
    kakao: any;
  }
}


const colorRed = '#eb4d4b';
const colorOrg = '#f39c12';
const colorGrn = '#27ae60';

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
    conditionBgColor : '#009432'
  });
  const [countInCircle,setCountInCircle] = useState(0);
  const [latitude, setLatitude] = useState(37.4882);
  const [longitude, setLongitude] = useState(127.1026);
  const [search,setSearch] = useState('');
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

  const makeArrayPatient = () => {
    let PatientInfo : Object[] = [];
    if(Patient.mapData) {
      Patient.data.map((value) => {
        let daysGap : number;
        // daysGap = isInFewDays(value.month, value.day);
        const curDay = {
          _month : value.month,
          _date : value.day
        }
        daysGap = DateGapAcumulator(curDay);
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
            MakeMarkerInfected(map,patient, colorRed);
          } else if (1 < daysGap && daysGap <= 4){
            MakeMarkerInfected(map,patient, colorOrg);
          } else if (4 < daysGap && daysGap <=9){
            MakeMarkerInfected(map,patient, colorGrn);
          } else {
            console.log('MAP none in circle');
          }

          let distance : number;
          const getDistance  = {
            lat : latitude,
            lng : longitude,
            _lat : patient.lat,
            _lng : patient.lng
          }
          distance = PositionDistance(getDistance);
          if(distance < 3600){
            AddCount();
          }
        }
      });
    }
  }

  const AddCount = () => {
    setCountInCircle((prevCount) => prevCount+1);
  }

  const btn_reload = () => {
    setCountInCircle(0);
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords === null) {
      navigator.geolocation.getCurrentPosition(onEvent, onError);
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
      MakeMarkerMyPosition(map, latitude, longitude);
      makeArrayPatient();
    } else {
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
      MakeMarkerMyPosition(map, latitude, longitude);

      makeArrayPatient();
    }
    init();
  }

  const btn_search = () => {
    const form : any= document.querySelector('.form-search');
    const menu_wrap = document.querySelector('#menu_wrap');
    if(formState === 'none'){
      form.classList.remove('none');
      form.classList.add('show');
      setFormState('show');
      menu_wrap?.classList.remove('show');
      menu_wrap?.classList.add('none');
    } else {
      form.classList.remove('show');
      form.classList.add('none');
      setFormState('none');
      menu_wrap?.classList.remove('show');
      menu_wrap?.classList.add('none');
    }
  }

  const onChangeSearch = (e : any) =>{
    setSearch(e.target.value);
  }

  const onSubmitForm = (e : any) => {
    const menu_wrap = document.querySelector('#menu_wrap');
    menu_wrap?.classList.toggle('none');
    menu_wrap?.classList.toggle('show');
    e.preventDefault();
    DeleteMapElements();
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
      map = new window.kakao.maps.Map(container, options);

      // 마커를 담을 배열입니다
      var markers : any= [];

      // 장소 검색 객체를 생성합니다
      var ps = new window.kakao.maps.services.Places();  

      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      var infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

      // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
      // 인포윈도우에 장소명을 표시합니다
      const displayInfowindow = (marker : any , title : any) => {
        var content = '<div style="padding:5px;z-index:1;">' + title + '</div>';

        infowindow.setContent(content);
        infowindow.open(map, marker);
      }

      // 검색결과 목록의 자식 Element를 제거하는 함수입니다
      const removeAllChildNods = (el : any) => {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
      }

      // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
      const displayPagination = (pagination: any) => {
        var paginationEl : any = document.getElementById('pagination'),
            fragment : any = document.createDocumentFragment(),
            i; 

        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }

        for (i=1; i<=pagination.last; i++) {
            var el = document.createElement('a');
            el.href = "#";
            el.innerHTML = `${i}`;

            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }

            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
      }

      // 지도 위에 표시되고 있는 마커를 모두 제거합니다
      const removeMarker = () => {
        for ( var i = 0; i < markers.length; i++ ) {
            markers[i].setMap(null);
        }   
        markers = [];
      }
      
      // 검색 결과 목록과 마커를 표출하는 함수입니다
      const displayPlaces = (places : any) => {

        var listEl = document.getElementById('placesList'), 
        menuEl : any = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment(), 
        bounds = new window.kakao.maps.LatLngBounds(), 
        listStr = '';
        
        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);

        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        
        for ( var i=0; i<places.length; i++ ) {

            // 마커를 생성하고 지도에 표시합니다
            var placePosition = new window.kakao.maps.LatLng(places[i].y, places[i].x),
                marker : any = AddMarker(map, markers, placePosition, i), 
                itemEl : any = SearchPlaces(i, places[i]); // 검색 결과 항목 Element를 생성합니다

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);

            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다
            (function(marker, title) {
                window.kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });

                window.kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });

                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };

                itemEl.onmouseout =  function () {
                    infowindow.close();
                };
            })(marker, places[i].place_name);

            fragment.appendChild(itemEl);
        }

        // 검색결과 항목들을 검색결과 목록 Elemnet에 추가합니다
        listEl?.appendChild(fragment);
        menuEl.scrollTop = 0;

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }


      // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
      const placesSearchCB = (data : any, status : any, pagination : any) => {
        if (status === window.kakao.maps.services.Status.OK) {

            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);

            // 페이지 번호를 표출합니다
            displayPagination(pagination);

        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {

            alert('검색 결과가 존재하지 않습니다.');
            return;

        } else if (status === window.kakao.maps.services.Status.ERROR) {

            alert('검색 결과 중 오류가 발생했습니다.');
            return;

        }
      } 

      // 키워드 검색을 요청하는 함수입니다
      const searchPlaces = () => {

        var key : any = document.getElementById('keyword');
        let keyword : any = key.value;

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
        ps.keywordSearch( keyword, placesSearchCB); 
      }

      // 키워드로 장소를 검색합니다
      searchPlaces();

      
    
    });
    setCountInCircle(0);
    makeArrayPatient();
    const form : any= document.querySelector('.form-search');
    form.classList.remove('show');
    form.classList.add('none');
    setFormState('none');
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
      Container.style.backgroundColor = stateAlami.conditionBgColor;
    } else if ( 1 <= countInCircle && countInCircle <=2 ){
      setStateAlami({
        conditionState : 'soso',
        conditionTxt : '조금 위험',
        conditionFace : 'icon-meh',
        conditionBgColor : '#009432'
      });
      Container.style.backgroundColor = stateAlami.conditionBgColor;
    } else if ( 3 <= countInCircle && countInCircle <= 5 ){
      setStateAlami({
        conditionState : 'bad',
        conditionTxt : '위험',
        conditionFace : 'icon-frown',
        conditionBgColor : '#cc8e35'
      });
      Container.style.backgroundColor = stateAlami.conditionBgColor;
    } else if ( 6<= countInCircle ) {
      setStateAlami({
        conditionState : 'terr',
        conditionTxt : '매우 위험',
        conditionFace : 'icon-emo-devil',
        conditionBgColor : '#b33939'
      });
      Container.style.backgroundColor = stateAlami.conditionBgColor;
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onEvent, onError);
    
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
          center: new window.kakao.maps.LatLng(
            latitude,
            longitude
          ),
          level: 8,
        };
        map = new window.kakao.maps.Map(container, options);
      });

      MakeMarkerMyPosition(map, latitude,longitude);
    };
    init();
    return(() =>{
      DeleteMapElements()
    });
  }, []);

  return (
    <>
      <div id="map"></div>
      <SearchLists searchValue={search}/>
      <div className="options">
        <Data lat={latitude} 
              lng={longitude}
              patientNum={countInCircle}
              alami={stateAlami}
        />
        <MapNav />
        <form className="form-search none" onSubmit={onSubmitForm}>
          <input type="text" value={search} onChange={onChangeSearch}/>
        </form>
        <a href="#" className="btn" id="btn-search" onClick={btn_search}><i className="icon-search"></i></a>
        <a href="#" className="btn" id="btn-reload" onClick={btn_reload}><i className="icon-location"></i></a>
      </div>
      <NavBottom />
      {/* <InfectedMarker /> */}
    </>
  );
}
export default Map;