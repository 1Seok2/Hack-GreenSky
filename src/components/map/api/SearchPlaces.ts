const SearchPlaces = (index : any, places : any) => {

    var el : any = document.createElement('li'),
    itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                '<div class="info">' +
                '   <h5>' + places.place_name + '</h5>';

    if (places.road_address_name) {
        itemStr += '    <span>' + places.road_address_name + '</span>' +
                    '   <span class="jibun gray">' +  places.address_name  + '</span>';
    } else {
        itemStr += '    <span class="make-address">' +  places.address_name  + '</span>'; 
    }
                
      itemStr += '  <span class="tel">'+ `<a href="tel:${places.phone}">${places.phone}</a>` + '</span>' +
                '</div>';           

    el.innerHTML = itemStr;
    el.className = 'item';

    return el;
}

export default SearchPlaces;