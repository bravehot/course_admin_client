export default {
  changeCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  selectDayData (state, memoList) {
    state.memoList = memoList
  },
  getTimeList (state, timeList) {
    state.timeList = timeList
  }
}