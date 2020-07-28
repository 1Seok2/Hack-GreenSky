import { useState } from 'react';

interface Condition {
    countInCircle : number
}

const SetCondition = (props : number) => {
    const [condition,setCondition] = useState({
        conditionState : 'good',
        conditionTxt : '좋음',
        conditionFace : 'icon-smile',
        conditionBgColor : '#1289A7'
    })
    const Container : any = document.getElementById('dataContainer');
    if(props < 1){
      setCondition({
        conditionState : 'good',
        conditionTxt : '좋음',
        conditionFace : 'icon-smile',
        conditionBgColor : '#1289A7'
      });
      Container.style.backgroundColor = condition.conditionBgColor;
    } else if ( 1 <= props && props <=2 ){
      setCondition({
        conditionState : 'soso',
        conditionTxt : '조금 위험',
        conditionFace : 'icon-meh',
        conditionBgColor : '#009432'
      });
      Container.style.backgroundColor = condition.conditionBgColor;
    } else if ( 3 <= props && props <= 5 ){
      setCondition({
        conditionState : 'bad',
        conditionTxt : '위험',
        conditionFace : 'icon-frown',
        conditionBgColor : '#cc8e35'
      });
      Container.style.backgroundColor = condition.conditionBgColor;
    } else if ( 6<= props ) {
      setCondition({
        conditionState : 'terr',
        conditionTxt : '매우 위험',
        conditionFace : 'icon-emo-devil',
        conditionBgColor : '#b33939'
      });
      Container.style.backgroundColor = condition.conditionBgColor;
    }

    return condition;
}

export default SetCondition;