export default {
  changeCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  selectDayData (state, memoList) {
    state.memoList = memoList
  },
  getTimeList (state, timeList) {
    state.timeList = timeList
  },
  setStartTime (state, startTime) {
    state.startTime = startTime
  },
  setThisWeek (state, thisWeek) {
    state.thisWeek = thisWeek
  },
  setNeedClass (state, setNeedClass) {
    state.setNeedClass = setNeedClass
  }
}