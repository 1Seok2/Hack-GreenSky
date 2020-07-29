// 확진자들의 위치 마커로 만듦

const MakeMarkerInfected = (map : any,_patient : any, color:string) => {
    const circle = new window.kakao.maps.Circle({
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

export default MakeMarkerInfected;