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
export  {
  formatTime,
  getNowTimes,
  formatHour,
  formatMinute,
}


