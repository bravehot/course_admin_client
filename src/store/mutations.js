export default {
  setErrorInfo(state, errMsg='') {
    state.errMsg = errMsg
  },
  handleLogin(state, username) {
    state.username = username
  },
  changeCollapse (state) {
    state.isCollapse = !state.isCollapse
  },
  selectDayData (state, thisTime) {
    state.thisTime = thisTime
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
    state.needClassList = setNeedClass
  },
  getThisWeekInfo(state, thisWeekInfo) {
    state.thisWeekInfo = thisWeekInfo
  },
  getThisClassInfo(state, thisClassInfo) {
    state.thisClassInfo = thisClassInfo
  }
}