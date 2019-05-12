import { setTeacherClass, setStartTime, getUserInfo, getThisWeekInfo } from '../api/index'
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
  setNeedClass({ commit }, needClassList) { // 设置需要上课的班级
    commit('setNeedClass', needClassList)
  },
  async getUserInfo({ commit }) {
    let result = await getUserInfo()
    if (result.code === 200) {
      let {classNames, classTimes, startTime, username} = result.data
      commit('setStartTime', startTime)
    }
  },
  async setStartTime({ commit }, startTime) { // 设置开学时间
    let result = await setStartTime({startTime})
    if (result.code === 200){
      commit('setStartTime', startTime)
    }
  },
  async setTeacherClass({ commit }, teacherClass) { // 设置教师上课信息
    let result = await setTeacherClass(teacherClass)
    // console.log(result)
    // commit('setTeacherClass', teacherClass)
  },
  async getThisWeekInfo({commit}, weeksName) { // 获取当前周的信息
    let result = await getThisWeekInfo(weeksName)
    if (result.code === 200) {
      commit('getThisWeekInfo', result.data)
    }
  }

}