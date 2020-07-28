import { useState } from 'react';

const GetNowTime = () => {
    const [nowTime,setNowTime] = useState({
        nowYear : '',
        nowMonth : '',
        nowDate : '',
        nowHour : '',
        nowMin : ''
    })
    let curTime = new Date();
    setNowTime({
      nowYear : `${curTime.getFullYear()}`,
      nowMonth : curTime.getMonth()+1 < 10 ? (`0${curTime.getMonth()+1}`) : `${curTime.getMonth()+1}`,
      nowDate : curTime.getDate() < 10 ? (`0${curTime.getDate()}`) : `${curTime.getDate()}`,
      nowHour : curTime.getHours() < 10 ? (`0${curTime.getHours()}`) : `${curTime.getHours()}`,
      nowMin : curTime.getMinutes() < 10 ? (`0${curTime.getMinutes()}`) : `${curTime.getMinutes()}`
    });
    return nowTime;
}

export default GetNowTime;