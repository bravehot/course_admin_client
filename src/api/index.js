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
export {
  handleLogin,
  setUserInfo,
  mudificationPwd
}
 