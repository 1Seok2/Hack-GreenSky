const MakeMarkerMyPosition = (map:any,_lat : any,_lng : any) => {
    var markerPosition = new window.kakao.maps.LatLng(
      _lat,
      _lng
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
        _lat,
        _lng
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

export default MakeMarkerMyPosition;