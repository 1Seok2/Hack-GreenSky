import React, { Component, useState, useEffect } from 'react';
import MakeSentence from './MakeSentence';
import OtherMenu from '../navigation/OtherMenu';
import AlertModal from './modal/alertModal';
import Tips from './Tips'
import '../../style/Data.css';
import '../../style/fontello-6de7bc38/css/mapticon-embedded.css';

interface DataProps {
  lat : number,
  lng : number,
  patientNum : number,
  alami : any
}

const Data = (props : DataProps) => {
  const [btnState, setBtnState] = useState('show');
  const [btnValue, setBtnValue] = useState('icon-map-o');
  const [nowTime, setNowTime] = useState({
    nowYear : '',
    nowMonth : '',
    nowDate : '',
    nowHour : '',
    nowMin : ''
  });

  const onClickPos = () => {
    //init();
    const data : any= document.getElementById('dataContainer');
    const back : any = document.getElementById('btn-back');
    const searchBtn : any = document.getElementById('btn-search');
    const reloadBtn : any = document.getElementById('btn-reload');
    const tipsBtn : any = document.getElementsByClassName('btn-tips')[0];
    if(btnState === 'show'){
      data.classList.remove('show');
      data.classList.add('none');
      setBtnState('none');
      setBtnValue('icon-emo-wink');
      back.style.color = "black";
      searchBtn.style.color = "black";
      reloadBtn.style.color = "black";
      tipsBtn.style.color = "black";
    } else {
      data.classList.remove('none');
      data.classList.add('show');
      setBtnState('show');
      setBtnValue('icon-map-o');
      back.style.color = "white";
      searchBtn.style.color = "white";
      reloadBtn.style.color = "white";
      tipsBtn.style.color = "white";
    }
  };

  const getNowTime = () => {
    let nowTime = new Date();
    setNowTime({
      nowYear : `${nowTime.getFullYear()}`,
      nowMonth : nowTime.getMonth()+1 < 10 ? (`0${nowTime.getMonth()+1}`) : `${nowTime.getMonth()+1}`,
      nowDate : nowTime.getDate() < 10 ? (`0${nowTime.getDate()}`) : `${nowTime.getDate()}`,
      nowHour : nowTime.getHours() < 10 ? (`0${nowTime.getHours()}`) : `${nowTime.getHours()}`,
      nowMin : nowTime.getMinutes() < 10 ? (`0${nowTime.getMinutes()}`) : `${nowTime.getMinutes()}`
    });
  }

  useEffect(() => {
    getNowTime();
    const Container : any = document.getElementById('dataContainer');
    Container.style.backgroundColor = props.alami.conditionBgColor;
    console.log('rerender');
  },[nowTime.nowMin]);

  

  return (
    <>
      <Tips />
      <AlertModal idNum={0} contents={[
        "⚠️ 필독 ⚠️",
        "좌측 하단의 현위치 버튼을 누를수록 위치를 잘 찾습니다",
        "우측 하단 버튼으로 지도/알리미를 볼 수 있습니다",
        "우측 상단 버튼으로 코로나 관련 홈페이지들에 방문 할 수 있습니다",
        "확진자가 방문한 곳을 표시합니다",
        "해외입국자를 제외한 수치 및 표기입니다"
      ]}/>
      <div className="dataContainer show" id="dataContainer" style={{backgroundColor:`${props.alami.conditionBgColor}`}}>
        <div className="other-menu-wrapper">
          <OtherMenu />
        </div>
        <div className="alami-wrapper">
          <div className="header">
            {/* 현 주소와 시간 표시 */}
            <h1 id="centerAddr">위치확인이 필요합니다</h1>
            <h2 id="now-time">{nowTime.nowYear}-{nowTime.nowMonth}-{nowTime.nowDate} {nowTime.nowHour}:{nowTime.nowMin}</h2>
          </div>
          <div className="contents">
            <div id="conditionFace">
              <i className={`${props.alami.conditionFace}`}></i>
            </div>
            <div className="data-list">
              <h3 id="conditionTxt">{props.alami.conditionTxt}</h3>
              <MakeSentence state={props.alami.conditionState} />
              <p className="data-list-part">주변 코로나환자수 : {props.patientNum} 명</p>
            </div>
          </div>
        </div>
      </div>
      <a href="#" id="btn-back" onClick={onClickPos}>
        <i className={btnValue}></i>
        <div>지도/알리미</div>
      </a>
    </>
  );

}
export default Data;