import React from 'react';
import '../../../style/fontello-6de7bc38/css/mapticon-embedded.css';

const MapNav = () => {
    return (
        <>
            <ul className="mapNav">
                {/* <li className="mapNav-list-title">확진자 발생 추이</li> */}
                <li className="navGrn">
                    <i className="icon-circle icon-circle-green"></i> 5~9 일 사이
                </li>
                <li className="navOrg">
                    <i className="icon-circle icon-circle-orange"></i> 2~4 일 사이
                </li>
                <li className="navRed">
                    <i className="icon-circle icon-circle-red"></i> 1일 이내
                </li>
            </ul>
        </>
    );
}

export default MapNav;