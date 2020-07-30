import SearchPlaces from './SearchPlaces';
import AddMarker from '../marker/AddMarker';

const SubmitSearchList = (map : any, latitude : number, longitude : number) => {
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

      
    
}

export default SubmitSearchList;