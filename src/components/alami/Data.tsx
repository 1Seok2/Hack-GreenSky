import React, { Component, useState, useEffect } from "react";
import MakeSentence from "./MakeSentence";
import OtherMenu from "../navigation/OtherMenu";
import AlertModal from "./modal/alertModal";
import Tips from "./Tips";
import "../../style/data.scss";
import "../../style/fontello-6de7bc38/css/mapticon-embedded.scss";

interface DataProps {
  lat: number;
  lng: number;
  patientNum: number;
  alami: any;
}

const Data = (props: DataProps) => {
  const [btnState, setBtnState] = useState("none");
  const [btnValue, setBtnValue] = useState("icon-emo-wink");
  const [nowTime, setNowTime] = useState({
    nowYear: "",
    nowMonth: "",
    nowDate: "",
    nowHour: "",
    nowMin: "",
  });

  const onClickPos = () => {
    //init();
    const data: any = document.getElementById("dataContainer");
    if (btnState === "show") {
      data.classList.remove("show");
      data.classList.add("none");
      setBtnState("none");
      setBtnValue("icon-emo-wink");
    } else {
      data.classList.remove("none");
      data.classList.add("show");
      setBtnState("show");
      setBtnValue("icon-map-o");
    }
  };

  const getNowTime = () => {
    let nowTime = new Date();
    setNowTime({
      nowYear: `${nowTime.getFullYear()}`,
      nowMonth:
        nowTime.getMonth() + 1 < 10
          ? `0${nowTime.getMonth() + 1}`
          : `${nowTime.getMonth() + 1}`,
      nowDate:
        nowTime.getDate() < 10
          ? `0${nowTime.getDate()}`
          : `${nowTime.getDate()}`,
      nowHour:
        nowTime.getHours() < 10
          ? `0${nowTime.getHours()}`
          : `${nowTime.getHours()}`,
      nowMin:
        nowTime.getMinutes() < 10
          ? `0${nowTime.getMinutes()}`
          : `${nowTime.getMinutes()}`,
    });
  };

  useEffect(() => {
    getNowTime();
    const Container: any = document.getElementById("dataContainer");
    Container.style.backgroundColor = props.alami.conditionBgColor;
    console.log("rerender");
  }, [nowTime.nowMin]);

  return (
    <>
      <Tips />
      <AlertModal
        idNum={0}
        contents={[
          "⚠️ 필독 ⚠️",
          // "위치 기본 값은 수서역 입니다",
          "우측 하단의 현위치 버튼으로 위치 재설정 가능합니다",
          "확진자가 방문한 곳을 표시합니다",
          "돋보기 버튼으로 다른지역을 검색하여 볼 수 있습니다",
          // "현재 코로나맵 리뉴얼 작업중에 있어 당분간 확진자 업데이트가 최신화되지 않을 수 있습니다. 빠른 시일내에 돌아오도록 하겠습니다.",
        ]}
      />
      <div
        className="dataContainer none"
        id="dataContainer"
        style={{ backgroundColor: `${props.alami.conditionBgColor}` }}
      >
        <div className="other-menu-wrapper">
          <OtherMenu />
        </div>
        <div className="alami-wrapper">
          <div className="header">
            {/* 현 주소와 시간 표시 */}
            <h1 id="centerAddr">위치확인이 필요합니다</h1>
            <h2 id="now-time">
              {nowTime.nowYear}-{nowTime.nowMonth}-{nowTime.nowDate}{" "}
              {nowTime.nowHour}:{nowTime.nowMin}
            </h2>
          </div>
          <div className="contents">
            <div id="conditionFace">
              <i className={`${props.alami.conditionFace}`}></i>
            </div>
            <div className="data-list">
              <h3 id="conditionTxt">{props.alami.conditionTxt}</h3>
              <MakeSentence state={props.alami.conditionState} />
              <p className="data-list-part">
                주변 코로나환자수 : {props.patientNum} 명
              </p>
            </div>
          </div>
        </div>
      </div>
      <a href="#" id="btn-back" onClick={onClickPos}>
        <i className={btnValue}></i>
      </a>
    </>
  );
};
export default Data;
