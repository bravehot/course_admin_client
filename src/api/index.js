/*
  包含n个接口请求函数的模块
  函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:3000/'
// login register 
const handleLogin = (data) => ajax(`${BASE_URL}login`, data, 'post')
// setUserInfo 
const setUserInfo = (data) => ajax(`${BASE_URL}setInfo`, data, 'post')
// mudification aright pwd
const mudificationPwd = (data) => ajax(`${BASE_URL}mudificationPwd`, data, 'post')
// setTeacherClass 
const setTeacherClass = (data) => ajax(`${BASE_URL}setTeacherClass`, data, 'post')
// 设置开学时间
const setStartTime  =  (data) => ajax(`${BASE_URL}setStartTime`, data, 'post')
// 获取用户的基本信息
const getUserInfo = () => ajax(`${BASE_URL}getUserInfo`)
// 获取当前周的上课信息
const getThisWeekInfo = (weeksName) => ajax(`${BASE_URL}getThisWeekInfo`, {weeksName})
export {
  handleLogin,
  setUserInfo,
  mudificationPwd,
  setTeacherClass,
  setStartTime,
  getUserInfo,
  getThisWeekInfo
}
 