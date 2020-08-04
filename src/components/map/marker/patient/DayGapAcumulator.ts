interface DateProps {
    _month : number,
    _date : number
}

const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();
const Months = (year%100 === 0 || year%4 === 0) && year%400 !== 0 ? 
        [31,28,31,30,31,30,31,31,30,31,30,31] :
        [31,29,31,30,31,30,31,31,30,31,30,31];

const DateGapAcumulator = (props : DateProps) : number => {
    // // 알고리즘 수정 요함
    // let gap : number = 11;
    // if(month === props._month+1 ){
    //   gap = date + (Months[props._month-1]-props._date);
    // } else if (month === props._month){
    //   gap = date-props._date;
    // }
    // return gap;
    let mon = props._month <10 ? `0${props._month}` : `${props._month}`;
    let date = props._date < 10 ? `0${props._date}` : `${props._date}`;
    let _date1 : any = `2020-${mon}-${date}`;
    let _date2 = new Date()
    var diffDate_1 = _date1 instanceof Date ? _date1 :new Date(_date1);
    var diffDate_2 = _date2 instanceof Date ? _date2 :new Date(_date2);
 
    diffDate_1 =new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
    diffDate_2 =new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
 
    var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
    diff = Math.ceil(diff / (1000 * 3600 * 24));
 
    return diff;

}

export default DateGapAcumulator;