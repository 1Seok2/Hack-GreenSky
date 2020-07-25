import React, { Component } from 'react';
import Patient from '../mapData.json';
import { Link } from 'react-router-dom';
import Map from './Map';
import './Data.css';

interface DataProps {
  lat : number,
  lng : number,
  patientNum : number
}

class Data extends Component<DataProps,{}> {
  state = {
    conditionFace : '🥰',
    conditionState : 'good',
    conditionTxt : '아주 좋습니다',
    btn_state : 'none'
  }

  init() {
    let CountPatient = this.props.patientNum;
    if(CountPatient < 1){
      this.setState({
        conditionState : 'good',
        conditionTxt : '아주 좋습니다',
        conditionFace : '🥰',
      });
    } else if ( 1 <= CountPatient && CountPatient <=2 ){
      this.setState({
        conditionState : 'soso',
        conditionTxt : '조금 위험합니다',
        conditionFace : '🙂',
      });
    } else if ( 3 <= CountPatient && CountPatient <= 5 ){
      this.setState({
        conditionState : 'bad',
        conditionTxt : '위험합니다',
        conditionFace : '😣',
      });
    } else if ( 6<= CountPatient ) {
      this.setState({
        conditionState : 'terr',
        conditionTxt : '외 출 금 지',
        conditionFace : '🤬',
      });
    }
  }
  onClickPos = () => {
    this.init();
    const data : any= document.getElementById('dataContainer');
    if(this.state.btn_state === 'show'){
      data.classList.remove('show');
      data.classList.add('none');
      this.setState({
        btn_state : 'none'
      });
    } else {
      data.classList.remove('none');
      data.classList.add('show');
      this.setState({
        btn_state : 'show'
      });
    }
  };

  render(){
    return (
      <>
        <div className="dataContainer none" id="dataContainer">
          <div className="header">
            <h1>코로나 지수 알리미</h1>
          </div>
          <div className="navBar">{/* nav bar */}</div>
          <div className="contents">
            <div>
              <span id="conditionFace">
                {this.state.conditionFace}
              </span>
            </div>
            <div className="data-list">
              <p id="conditionInfo">{this.state.conditionTxt}</p>
              <p className="data-list-part">주변 코로나환자수 : {this.props.patientNum} 명</p>
              <p className="data-list-part">위도 : {this.props.lat.toFixed(6)}</p>
              <p className="data-list-part">경도 : {this.props.lng.toFixed(6)}</p>
            </div>
          </div>
        </div>
          <a href="#" id="btn-back" onClick={this.onClickPos}>알리미 ON/OFF</a>
      </>
    );
  }
}

export default Data;