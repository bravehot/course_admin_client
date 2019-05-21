/**
 * 获取当前时间
 */
const formatTime = () => {
  return { 
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate()
  }
    
}
/**
 * 格式化时间
 * 返回格式 YYYY-MM-DD 
 */
const getNowTimes = (date) => { 
    let year = new Date(date).getFullYear()
    let month = new Date(date).getMonth() + 1
    let day = new Date(date).getDate()
    return `${year}-${month}-${day}`
}
/**
 * 格式化时间 —— 小时
 */
const formatHour = (hour) => {
  return new Date(hour.toString()).getHours().toString().padStart(2, "0")
}
/**
 * 格式化时间 —— 分钟
 */
const formatMinute = (minute) => {
  return new Date(minute.toString()).getMinutes().toString().padStart(2, "0")
}
/**
 * 返回两个日期距离的天数
 */
const getDistanceDays = (date1 , date2) => {
  let date1Str = date1.split("-") //将日期字符串分隔为数组,数组元素分别为年.月.日
  //根据年 . 月 . 日的值创建Date对象
  let date1Obj = new Date(date1Str[0],(date1Str[1]-1),date1Str[2]);
  let date2Str = date2.split("-");
  let date2Obj = new Date(date2Str[0],(date2Str[1]-1),date2Str[2]);
  let t1 = date1Obj.getTime();
  let t2 = date2Obj.getTime();
  let dateTime = 1000*60*60*24; //每一天的毫秒数
  let minusDays = Math.floor(((t2-t1)/dateTime));//计算出两个日期的天数差
  let days = Math.abs(minusDays);//取绝对值
  return days;
}
/**
 * 判断今天是周几
 */
const handleThisWeek = () => {
  let week = new Date().getDay()
  let result = ''
  switch (week) {
    case 1:
      result = '星期一'
      break;
    case 2:
      result = '星期二'
      break;
    case 3:
      result = '星期三'
      break;
    case 4:
      result = '星期四'
      break;
    case 5:
      result = '星期五'
      break;
    case 6:
      result = '星期六'
      break;
    case 7:
      result = '星期日'
      break;
    default:
      break;
  }
  return result
}

/**
 * 星期显示转换
 */
const handleWeek = (day) => {
  switch (day) {
    case 1:
      return '星期一'
    case 2:
      return '星期二'
    case 3:
      return '星期三'
    case 4:
      return '星期四'
    case 5:
      return '星期五'
    case 6:
      return '星期六'
    case 7:
      return '星期日'
    default:
      break;
  }
}
const handleClass = (className) => {
  switch (className) {
    case 0:
      return '无课'
    case 1:
      return '第一节'
    case 2:
      return '第二节'
    case 3:
      return '第三节'
    case 4:
      return '第四节'
    case 5:
      return '第五节'
    case 6:
      return '第六节'
    default:
      break;
  }
}
export {
  formatTime,
  getNowTimes,
  formatHour,
  formatMinute,
  getDistanceDays,
  handleWeek,
  handleClass,
  handleThisWeek
}


