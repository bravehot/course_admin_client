<template>
  <div class="calendar">
    <div class="calendar_head">
      <i class="el-icon-arrow-left" @click="chooseMouth('pre')"></i>
      <span>{{year}} 年 {{month + 1}} 月 {{day}} 日</span>
      <i class="el-icon-arrow-right" @click="chooseMouth('next')"></i>
    </div>
    <div class="calendar_main">
      <div class="calendar_m_head">
        <span v-for="(item, index ) in weekData" :key="index">{{item}}</span>
      </div>
      <div class="calendar_m_content">
        <span :class="`${item.content === day ? 'hot' : ''}`" v-for="(item, index) in renderData(year, month)" :key="index" @click="clickDays(item)">{{item.content}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      weekData: ['日', '一', '二', '三', '四', '五', '六'],
      year: new Date().getFullYear(),
      month: new Date().getMonth(),
      day: new Date().getDate()
    };
  },
  mounted () {
    this.renderData(this.year, this.month)
  },
  methods: {
    clickDays (item) {
      item.className = 'touch'
    },
    renderData (year, month) { 
      // 每个月的天数
      let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // 判断是否是闰月
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        monthDays[1] = 29;
      }
      // 计算当前月份第一天是星期几，根据此值就可以在前面渲染几个空数据
      let targetDay = new Date(year, month, 1).getDay() // 5
      let targetList = []
      // 填充当前月份的空白区域
      for (let i = 0; i < targetDay; i++) {
        let obj = {
          type: 'pre',
          content: '',
        }
        targetList.push(obj)
      }
      // 填充需要渲染的文字区域
      for (let i = 0; i < monthDays[month]; i++) {
        let obj = {
          type: 'normal',
          content: i + 1
        }
        targetList.push(obj)
      }
      return targetList
    },
    chooseMouth(type) { // 点击选择月份
      switch (type) {
        case 'pre':
          this.month--;
          if (this.month === 0) {
            this.year--;
            this.month = 12;
          }
          break;
        case 'next':
          this.month++;
          if (this.month === 13) {
            this.year++;
            this.month = 1;
          }
          break;
      }
    },
  }
};
</script>
<style lang="less" scoped>
.calendar {
  width: 70%;
  height: 100%;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
  overflow: hidden;
  .calendar_head {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 20px;
    i {
      font-weight: bold;
      cursor: pointer;
      padding: 5px;
    }
  }
  .calendar_main {
    margin-top: 10px;
    .calendar_m_head {
      display: flex;
      justify-content: space-around;
      & > span {
        display: inline-block;
        width: calc(100% / 7);
        text-align: center;
        border: 1px solid #333333;
        border-right: none;
        height: 30px;
        font: bold 12px/30px '微软雅黑'; 
      }
      &>span:last-child {
        border-right: 1px solid #333333;
      }
    }
    .calendar_m_content {
      span {
        cursor: pointer;
        float: left;
        display: inline-block;
        text-align: center;
        width: calc(100% / 7);
        height: 90px;
        font: bold 16px/90px '微软雅黑';
        &.hot {
          background: #007FFF;
          border-radius: 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
