<template>
  <div class="wrap">
    <div class="selectBox">
      <span>当前周：</span>
      <el-select v-model="thisWeeks" placeholder="请选择" @change="selectWeek">
        <el-option
          v-for="(item, index) in 25"
          :key="index"
          :value="'第' + item + '周'"
          :label="'第' + item + '周'"
        />
      </el-select>
    </div>
    <p class="title">上&nbsp;课&nbsp;时&nbsp;间&nbsp;表</p>
    <header>
      <div class="date">
        <span class="data">日期</span>
        <span class="time">时间</span>
      </div>
      <div v-for="(item, index) in weekList" :key="index" class="week">
        {{item}}
        <span class="detail" @click="getDetail(index)">详情</span>
      </div>
    </header>
    <div class="main">
      <div class="schoolTime">
        <div class="time" v-for="(item, index) in schoolTime" :key="index">
          <span>{{item.split(' ')[0]}}</span>
          <span class="line">{{item.split(' ')[1]}}</span>
          <span>{{item.split(' ')[2]}}</span>
        </div>
      </div>
      <div class="monday content" v-if="Array.isArray(this.oneWeekInfo.MondayInfo)">
        <div
          v-for="(item, index) in oneWeekInfo.MondayInfo[0]"
          :key="index"
          @click="showClassDetail('monday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教 室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班 级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="tuesday content" v-if="Array.isArray(this.oneWeekInfo.TuesdayInfo)">
        <div
          v-for="(item, index) in oneWeekInfo.TuesdayInfo[0]"
          :key="index"
          @click="showClassDetail('tuesday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="wednesday content" v-if="Array.isArray(this.oneWeekInfo.WednesdayInfo)">
        <div
          v-for="(item, index) in oneWeekInfo.WednesdayInfo[0]"
          :key="index"
          @click="showClassDetail('wednesday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="thursday content" v-if="Array.isArray(this.oneWeekInfo.ThursdayInfo)">
        <div
          v-for="(item, index) in oneWeekInfo.ThursdayInfo[0]"
          :key="index"
          @click="showClassDetail('thursday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="friday content" v-if="Array.isArray(this.oneWeekInfo.FridayInfo)">
        <div
          class="ellipsis"
          v-for="(item, index) in oneWeekInfo.FridayInfo[0]"
          :key="index"
          @click="showClassDetail('friday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="saturday content" v-if="Array.isArray(this.oneWeekInfo.SaturdayInfo)">
        <div
          class="ellipsis"
          v-for="(item, index) in oneWeekInfo.SaturdayInfo[0]"
          :key="index"
          @click="showClassDetail('saturday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课 程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
      <div class="sunday content" v-if="Array.isArray(this.oneWeekInfo.SundayInfo)">
        <div
          class="ellipsis"
          v-for="(item, index) in oneWeekInfo.SundayInfo[0]"
          :key="index"
          @click="showClassDetail('sunday', index)"
        >
          <p v-if="item.name" class="ellipsis">
            <strong>课程：</strong>
            <br>
            {{item.name[0]}}
          </p>
          <p v-if="item.roomName" class="ellipsis">
            <strong>教室：</strong>
            <br>
            {{item.roomName[0]}}
          </p>
          <p v-if="item.classNames" class="ellipsis">
            <strong>班级：</strong>
            <br>
            {{item.classNames[0]}}
          </p>
        </div>
      </div>
    </div>
    <el-dialog title="详情" :visible.sync="isDialogWeekShow" :width="dialogWidth" center>
      <div class="dialogContent">
        <div class="schoolTime">
          <div class="time" v-for="(item, index) in schoolTime" :key="index">
            <span>{{item.split(' ')[0]}}</span>
            <span class="line">{{item.split(' ')[1]}}</span>
            <span>{{item.split(' ')[2]}}</span>
          </div>
        </div>
        <div class="wrapBox" v-if="dialogClassContent">
          <div class="content" v-for="(item, index) in dialogClassContent" :key="index">
            <div v-for="(week, indexs) in item" :key="indexs">
              <p v-if="week.name">
                <strong>课 程：</strong>
                <br>
                <span v-if="week.name">{{week.name[0]}}</span>
              </p>
              <p v-if="week.roomName" class="ellipsis">
                <strong>教 室：</strong>
                <br>
                <span v-if="week.roomName">{{week.roomName[0]}}</span>
              </p>
              <p v-if="week.classNames">
                <strong>班 级：</strong>
                <br>
                <span v-if="week.classNames">{{week.classNames[0]}}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogWeekShow = false">取 消</el-button>
        <el-button type="primary" @click="isDialogWeekShow = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="课 程 详 情" :visible.sync="isDialogClassShow" :width="dialogWidth" center>
      <div class="dialogClassContent" v-if="dialogClassContent.name">
        <div v-if="Array.isArray(dialogClassContent.name)">
          <span class="title">课程名称：</span>
          <span class="detail">{{dialogClassContent.name[0]}}</span>
        </div>
        <div v-if="Array.isArray(dialogClassContent.roomName)">
          <span class="title">教室名称：</span>
          <span class="detail">{{dialogClassContent.roomName[0]}}</span>
        </div>
        <div v-if="Array.isArray(dialogClassContent.classNames)">
          <span class="title">上课班级：</span>
          <span class="detail">{{dialogClassContent.classNames[0]}}</span>
        </div>
      </div>
      <div v-else>休息一下吧！！！没课</div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="setClassInfo" :disabled="isSet">修改此课程</el-button>
        <el-button @click="isDialogClassShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  formatHour,
  formatMinute,
  getNowTimes,
  getDistanceDays
} from "../../util/getTime.js";
import { weekList } from "../../constants/dataList.js";
import { get } from "https";
export default {
  name: "myClass",
  data() {
    return {
      dialogWidth: '30%',
      thisWeeks: "",
      weekList,
      schoolTime: [
        "08:00 —— 09:30",
        "10:00 —— 11:30",
        "14:00 —— 15:30",
        "16:00 —— 17:30",
        "18:30 —— 20:00"
      ],
      isDialogWeekShow: false,
      isDialogClassShow: false,
      oneWeekInfo: {},
      dialogClassContent: [],
      isSet: false,
    }
  },

  computed: {
    ...mapState(["timeList", "thisWeek", "startTime", "thisWeekInfo"])
  },
  mounted() {
    this.initWeek(this.startTime, new Date());
  },
  methods: {
    setClassInfo() {
      // 修改此课程信息
      this.$router.push({
        name: "setClassInfo",
        params: { name: this.dialogClassContent.name[0] }
      });
      this.isDialogClassShow = false;
    },
    showClassDetail(type, index) {
      // 查看本节课的上课信息
      this.isDialogClassShow = true;
      switch (type) {
        case "monday":
          this.dialogClassContent = this.oneWeekInfo.MondayInfo[0][index];
          break;
        case "tuesday":
          this.dialogClassContent = this.oneWeekInfo.TuesdayInfo[0][index];
          break;
        case "wednesday":
          this.dialogClassContent = this.oneWeekInfo.WednesdayInfo[0][index];
          break;
        case "thursday":
          this.dialogClassContent = this.oneWeekInfo.ThursdayInfo[0][index];
          break;
        case "friday":
          this.dialogClassContent = this.oneWeekInfo.FridayInfo[0][index];
          break;
        case "saturday":
          this.dialogClassContent = this.oneWeekInfo.SaturdayInfo[0][index];
          break;
        case "sunday":
          this.dialogClassContent = this.oneWeekInfo.SundayInfo[0][index];
          break;
        default:
          break;
      }
      if (this.dialogClassContent.name) {
        this.isSet = false;
      } else {
        this.isSet = true;
      }
    },
    getDetail(index) {
      // 查看当天的上课信息
      switch (index) {
        case 0:
          this.dialogClassContent = this.oneWeekInfo.MondayInfo;
          break;
        case 1:
          this.dialogClassContent = this.oneWeekInfo.TuesdayInfo;
          break;
        case 2:
          this.dialogClassContent = this.oneWeekInfo.WednesdayInfo;
          break;
        case 3:
          this.dialogClassContent = this.oneWeekInfo.ThursdayInfo;
          break;
        case 4:
          this.dialogClassContent = this.oneWeekInfo.FridayInfo;
          break;
        case 5:
          this.dialogClassContent = this.oneWeekInfo.SaturdayInfo;
          break;
        case 6:
          this.dialogClassContent = this.oneWeekInfo.SundayInfo;
          break;
        default:
          break;
      }
      // 获取本天的上课信息
      this.isDialogWeekShow = true;
    },
    getThisWeekInfo() {
      // 获取周的上课信息
      let username = localStorage.getItem("username");
      let weeksName = this.thisWeeks;
      this.$store.dispatch("getThisWeekInfo", { username, weeksName });
    },
    selectWeek() {
      this.getThisWeekInfo();
    },
    initWeek(startTime, nowtime) {
      if (this.startTime) {
        nowtime = getNowTimes(nowtime);
        let distanceDays = getDistanceDays(this.startTime, nowtime); // 17
        let week;
        let count = distanceDays / 7;
        if (count > 0) {
          week = Math.floor(distanceDays / 7) + 1;
        } else {
          week = Math.floor(distanceDays / 7);
        }
        this.$store.dispatch("setThisWeek", `第${week}周`);
        if (week) {
          this.thisWeeks = `第${week}周`;
          this.getThisWeekInfo();
        }
      } else {
        // 用户没有设置开学时间
        this.$notify({
          title: "提示",
          message: "为更好展示课程安排，请到设置中设置开学时间",
          duration: 5000
        });
        return;
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
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let width = document.documentElement.clientWidth
      if (width < 800) {
        vm.dialogWidth = '80%'
      }
      //导航守卫，进入页面时更改状态
      console.log(123);
    });
  },
  watch: {
    thisWeekInfo(val) {
      this.oneWeekInfo = val;
      console.log(this.oneWeekInfo);
    },
    timeList: {
      handler: function(val) {
        this.handerTimeList(val);
      },
      deep: true
    },
    startTime(val) {
      this.initWeek(val, new Date());
    },
    thisWeek(val) {
      this.thisWeeks = val;
      console.log(11111);
      this.getThisWeekInfo();
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
  .dialogClassContent {
    padding: 0 20px;
    .title {
      font-size: 18px;
    }
    & > div {
      margin: 15px 0;
    }
  }
  .dialogContent {
    & > div.schoolTime {
      border-top: 1px solid;
    }
    & > div.wrapBox {
      display: flex;
      .content {
        width: 110px;
        box-sizing: border-box;
        border-top: 1px solid;
        & > div {
          width: 110px;
          height: 121px;
          border-right: 1px solid;
          border-bottom: 1px solid;
          padding: 5px 10px;
          box-sizing: border-box;
          text-align: center;
          font-size: 14px;
          p {
            margin: 5px 0;
            strong {
              font-weight: bold;
              padding-bottom: 5px;
            }
          }
        }
      }
    }
  }
  .title {
    font: bold 24px/30px "微软雅黑";
    text-align: center;
    padding: 20px 0;
  }
  header {
    border: 1px solid;
    width: 880px;
    display: flex;
    & > div.date {
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
    & > .week {
      position: relative;
      .detail {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        right: 2px;
        line-height: 12px;
        cursor: pointer;
        color: #409eff;
        font-weight: bold;
      }
    }
    & > div,
    & > span {
      width: 110px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      border-right: 1px solid;
      box-sizing: border-box;
    }
    & > span {
      display: inline-block;
    }
    & > span:last-child {
      border-right: none;
    }
  }
  .main,
  .dialogContent {
    display: flex;
    overflow-y: hidden;
    .content {
      cursor: pointer;
      width: 110px;
      box-sizing: border-box;
      & > div {
        width: 110px;
        height: 121px;
        border-right: 1px solid;
        border-bottom: 1px solid;
        padding: 5px 10px;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        p {
          margin: 5px 0;
          strong {
            font-weight: bold;
            padding-bottom: 5px;
          }
        }
      }
    }
  }
  .schoolTime {
    width: 110px;
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
        transform: rotate(90deg);
      }
    }
    & > .time {
      border-top: none;
    }
  }
}
@media screen and (max-width: 680px) {
  .wrap {
    min-width: 560px !important;
    .selectBox {
      width: 100%;
    }
    header {
      width: 560px !important;
      overflow: auto;
      & > div {
        width: 70px;
      }
      .detail {
        right: 0;
        bottom: 2px;
      }
      & > div.date {
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          width: 70px;
          height: 1px;
          box-sizing: border-box;
          border-bottom: 1px solid #333;
          transform: rotateZ(14deg);
        }
      }
    }
    .main {
      width: 560px;
      .schoolTime {
        width: 70px;
        .time {
          width: 70px;
        }
      }
      .content {
        width: 70px;
        & > div {
          width: 100%;
        }
      }
      .el-dialog {
        width: 50%;
      }
    }
  }
}
</style>
