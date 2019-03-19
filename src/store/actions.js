export default {
  changeCollapse({commit}) { // 控制左侧导航栏
    commit('changeCollapse')
  },
  selectDayData ({commit}, memoList) { // 选中日期的相关数据
    commit('selectDayData', memoList)
  },
  getTimeList ({commit}, timeList) {
    commit('getTimeList', timeList)
  } 
}