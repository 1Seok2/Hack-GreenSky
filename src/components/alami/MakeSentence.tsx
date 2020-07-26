import React from 'react';

interface SentenceProps {
    state : string
}

const MakeSentence = (props : SentenceProps) => {
    const GoodSentences = [
        "이 주변은 청정지역 !",
        "개인위생 철저히 지켜주시며 다니세요",
        "밀린 장을 보러 가볼까요 ?",
        "친목 때도 조심 ! 아시죠 ?",
        "사회적 거리두기는 지켜주세요",
        "미뤄뒀던 미용실을 가볼까요 ?",
        "타지역의 사람을 믿지 마세요",
        "그래도 실내는 언제나 조심 !",
        "미뤄뒀던 일들을 처리하세요"
    ];
    const SosoSentences = [
        "이정도면 간단한 외출 쯤이야 ..",
        "마스크 잘 쓰고 다니세요 !",
        "손 잘 씻고 다니세요 !",
        "방심은 금물 !",
        "마스크는 항상 해야합니다",
        "돌아다니는 사람은 자신만이 아니라는 것",
        "타지역의 사람을 조심해야 해요",
        "나갈까 말까 ..?",
        "사회적 거리두기는 필수 !"
    ];
    const BadSentences = [
        "나가시지 않는 것을 추천드립니다",
        "꼭 밖에 나가셔야 하나요 ?",
        "이럴땐 집에 숨어야 해요",
        "주변을 조심하세요 !",
        "오히려 타지역에서 온 사람이 위험하겠네요",
        "집에 아무도 초대하지 마세요",
        "당분간은 집에 계시는게 좋을 것 같네요",
        "힘든 출근길에도 조심 !",
        "신나는 퇴근길에도 조심 !"
    ];
    const TerrSentences = [
        "외출하지 않으시는게 좋습니다",
        "꼭 밖에 나가셔야 하나요 ?",
        "좀 심각한데요 ..?",
        "집에서 할 재밌는 것을 찾으세요",
        "오히려 타지역에서 온 사람이 위험하겠네요",
        "힘든 출퇴근길이 되겠군요",
        "외 출 금 지",
        "아무도 집에 초대하지 마세요",
        "나 혼자가 최고 !"
    ];


    const chooseSentence = () => {
        let RandomNum = Math.floor(Math.random() * GoodSentences.length);
        if(props.state === 'good') return GoodSentences[RandomNum];
        else if(props.state === 'soso') return SosoSentences[RandomNum];
        else if(props.state === 'bad') return BadSentences[RandomNum];
        else if(props.state === 'terr') return TerrSentences[RandomNum];
        else return "Error";
    }

    return (
        <> 
            <div id="conditionInfo">
                {chooseSentence()}
            </div>
        </>
    );
}

export default MakeSentence;