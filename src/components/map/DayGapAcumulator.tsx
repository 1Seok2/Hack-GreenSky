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
    // 알고리즘 수정 요함
    let gap : number = 11;
    if(month === props._month+1 ){
      gap = date + (Months[props._month-1]-props._date);
    } else if (month === props._month){
      gap = date-props._date;
    }
    return gap;
}

export default DateGapAcumulator;