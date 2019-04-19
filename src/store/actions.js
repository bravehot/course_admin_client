// import { handleLogin } from '../api/index'
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
  setStartTime({ commit }, startTime) { // 设置开学时间
    commit('setStartTime', startTime)
  },
  setNeedClass({ commit }, needClassList) { // 设置需要上课的班级
    commit('setNeedClass', needClassList)
  }
}