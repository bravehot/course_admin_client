import { setTeacherClass, setStartTime, getUserInfo, getThisWeekInfo, getThisClassInfo, setNeedClass } from '../api/index'
export default {
  handleLogin({ commit }, username) { // 登录
    commit('handleLogin', username)
  },
  changeCollapse({ commit }) { // 控制左侧导航栏
    commit('changeCollapse')
  },
  selectDayData({ commit }, memoList) { // 选中日期的相关数据
    commit('selectDayData', memoList)
  },
  getTimeList({ commit }, timeList) { // 获取上课时间
    commit('getTimeList', timeList)
  },
  setThisWeek({ commit }, thisWeek) { // 设置当前周
    commit('setThisWeek', thisWeek)
  },
  async setNeedClass({ commit }, needClassList) { // 设置需要上课的班级
    let result = await setNeedClass(needClassList)
    if (result.code === 200) {
      commit('setNeedClass', result.data)
    }
  },
  async getUserInfo({ commit }) {
    let result = await getUserInfo()
    if (result.code === 200) {
      let {classNames, classTimes, startTime} = result.data
      commit('setStartTime', startTime)
      commit('setNeedClass', classNames)
    }
  },
  async setStartTime({ commit }, startTime) { // 设置开学时间
    let result = await setStartTime({startTime})
    if (result.code === 200){
      commit('setStartTime', startTime)
    }
  },
  async setTeacherClass({ commit }, teacherClass) { // 设置教师上课信息
    await setTeacherClass(teacherClass)
  },
  async getThisWeekInfo({commit}, {username, weeksName}) { // 获取当前周的信息
    let result = await getThisWeekInfo(username, weeksName)
    if (result.code === 200 || result.code === 400) {
      commit('getThisWeekInfo', result.data)
    } 
  },
  async getThisClassInfo({commit}, {username, className}) { // 获取本课程的所有信息
    let result = await getThisClassInfo(username, className)
    if (result.code === 200) {
      commit('getThisClassInfo', result.data)
    } else if (result.code === 400) {
      commit('setErrorInfo', result.msg)
    }
  },
}