/*
包含n个接口请求函数的模块
函数的返回值: promise对象
 */
import ajax from './ajax'
const BASE_URL = 'http://localhost:3000/'

const handleLogin = (data) => ajax(`${BASE_URL}login`, data, 'post')

export {
  handleLogin
}
 