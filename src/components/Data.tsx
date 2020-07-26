import React, { Component, useState, useEffect } from 'react';
import '../style/Data.css';

interface DataProps {
  lat : number,
  lng : number,
  patientNum : number,
  alami : any
}

const Data = (props : DataProps) => {
  const [btnState, setBtnState] = useState('show');
  const [btnValue, setBtnValue] = useState('지도 보기');
  const [nowTime, setNowTime] = useState({
    nowYear : 0,
    nowMonth : 0,
    nowDate : 0,
    nowHour : 0,
    nowMin : 0
  });
  
  const onClickPos = () => {
    //init();
    const data : any= document.getElementById('dataContainer');
    if(btnState === 'show'){
      data.classList.remove('show');
      data.classList.add('none');
      setBtnState('none');
      setBtnValue('지수 보기');
    } else {
      data.classList.remove('none');
      data.classList.add('show');
      setBtnState('show');
      setBtnValue('지도 보기');
    }
  };

  const getNowTime = () => {
    let nowTime = new Date();
    setNowTime({
      nowYear : nowTime.getFullYear(),
      nowMonth : nowTime.getMonth()+1,
      nowDate : nowTime.getDate(),
      nowHour : nowTime.getHours(),
      nowMin : nowTime.getMinutes()
    });
  }

  useEffect(() => {
    getNowTime();
    console.log('rerender');
  },[nowTime.nowMin]);

  

  return (
    <>
      <div className="dataContainer show" id="dataContainer">
        <div className="header">
          {/* 현 주소와 시간 표시 */}
          <h1 id="centerAddr"></h1>
          <h2>{nowTime.nowYear}-{nowTime.nowMonth}-{nowTime.nowDate} {nowTime.nowHour}:{nowTime.nowMin}</h2>
        </div>
        <div className="navBar">{/* nav bar */}</div>
        <div className="contents">
          <div>
            <span id="conditionFace">
              {props.alami.conditionFace}
            </span>
          </div>
          <div className="data-list">
            <p id="conditionInfo">{props.alami.conditionTxt}</p>
            <p className="data-list-part">주변 코로나환자수 : {props.patientNum} 명</p>
          </div>
        </div>
      </div>
      <a href="#" id="btn-back" onClick={onClickPos}>{btnValue}</a>
    </>
  );

}
export default Data;