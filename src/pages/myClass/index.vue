<template>
  <div class="wrap">
    <div class="selectBox">
      <span>当前周：</span>
      <el-select v-model="thisWeek" placeholder="请选择">
        <el-option
          v-for="(item, index) in 25"
          :key="index"
          :value=item>
          {{item}}
        </el-option>
    </el-select>
    </div>
    <p class="title">上&nbsp;课&nbsp;时&nbsp;间&nbsp;表</p>
    <header>
      <div>
        <span class="data">日期</span>
        <span class="time">时间</span>
      </div>
      <span v-for="(item, index) in weekList" :key="index">{{item}}</span>
    </header>
    <div class="main">
      <div class="schoolTime">
        <div class="time" v-for="(item, index) in schoolTime" :key="index">
          <span>{{item.split(' ')[0]}}</span>
          <span class="line">{{item.split(' ')[1]}}</span>
          <span>{{item.split(' ')[2]}}</span>
        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
import { mapState } from "vuex";
import { formatHour, formatMinute, getNowTimes, getDistanceDays } from "../../util/getTime.js";
export default {
  name: "myClass",
  data() {
    return {
      weekList: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ],
      schoolTime: [
        "08:00 —— 09:30",
        "10:00 —— 11:30",
        "14:00 —— 15:30",
        "16:00 —— 17:30",
        "18:30 —— 20:00",
        "20:00 —— 21:30"
      ]
    };
  },
  computed: {
    ...mapState(["timeList", "thisWeek", "startTime"])
  },
  mounted () {
    this.initWeek(this.startTime, new Date())
  },
  methods: {
    initWeek(startTime, nowtime) {
      if (this.startTime) {
        nowtime = getNowTimes(nowtime)
        let distanceDays = getDistanceDays(this.startTime, nowtime) // 17
        console.log(distanceDays)
        let week = Math.ceil(distanceDays / 7) + 1;
        this.$store.dispatch('setThisWeek', week)
      } else { // 用户没有设置开学时间
        this.$notify({
          title: '提示',
          message: '为更好展示课程安排，请到设置中设置开学时间',
          duration: 5000
        });
        return
      }
    },
    handerTimeList(timeList) {
      if (timeList) {
        this.schoolTime = [];
        timeList.forEach(item => {
          let startHour = formatHour(item[0]);
          let startMinutes = formatMinute(item[0]);
          let endHour = formatHour(item[1]);
          let endMinutes = formatMinute(item[1]);
          let result = `${startHour}:${startMinutes} —— ${endHour}:${endMinutes}`;
          this.schoolTime.push(result);
        });
      }
    }
  },
  watch: {
    timeList: {
      handler: function(val) {
        this.handerTimeList(val);
      },
      deep: true
    },
    startTime (val) {
      this.initWeek(val, new Date())
    }
  }
};
</script>
<style lang="less" scoped>
.wrap {
  min-width: 960px;
  height: 100%;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
  margin: 20px 20px;
  padding: 20px 40px;
  box-sizing: border-box;
  .title {
    font: bold 24px/30px "微软雅黑";
    text-align: center;
    padding: 20px 0;
  }
  header {
    overflow: hidden;
    border: 1px solid;
    & > div {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      // background: linear-gradient(15deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        width: 110px;
        height: 1px;
        box-sizing: border-box;
        border-bottom: 1px solid #333;
        transform: rotateZ(14deg);
      }
      span {
        font: 100 12px "微软雅黑";
        height: 15px;
      }
      .data {
        text-align: right;
        padding-right: 15px;
      }
      .time {
        text-align: left;
        padding-left: 15px;
      }
    }
    & > div,
    & > span {
      float: left;
      width: 108px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-right: 1px solid;
    }
    & > span {
      display: inline-block;
    }
    & > span:last-child {
      border-right: none;
    }
  }
  .main {
    .schoolTime {
      display: flex;
      flex-direction: column;
      & > .time {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 109px;
        height: 120px;
        border: 1px solid;
        span {
          margin: 10px 0;
        }
        .line {
          transform: rotate(90deg)
        }
      }
      & > .time {
        border-top: none;
      }
    }
  }
}
</style>
