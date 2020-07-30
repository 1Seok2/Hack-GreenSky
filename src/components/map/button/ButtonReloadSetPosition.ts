const ButtonReloadSetPosition = (latitude : number, longitude : number) => {
    let container = document.getElementById('map');
    let options = {
        center: new window.kakao.maps.LatLng(
        latitude,
        longitude
        ),
        level: 8,
    };
    let _map = new window.kakao.maps.Map(container, options);
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
    searchAddrFromCoords(_map.getCenter(), displayCenterInfo);

    return _map;
}

export default ButtonReloadSetPosition;