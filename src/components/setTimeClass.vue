<template>
  <div class="timeClass">
    <div class="main">
      <div class="first">
        <label for="first">第一节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.first"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div class="second">
        <label for="first">第二节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.second"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div class="third">
        <label for="first">第三节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.third"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div class="fourth">
        <label for="first">第四节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.fourth"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div class="night">
        <span>晚：</span>
      </div>
      <div class="nightFirst">
        <label for="first">第一节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.nightFirst"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <div class="nightSecond">
        <label for="first">第二节:</label>
        <el-time-picker
          format='HH:mm'
          :disabled="isSet"
          is-range
          :clearable='false'
          v-model="timeData.nightSecond"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </div>
      <footer>
        <el-button type="primary" :disabled="!isSet" @click="setTime">修改</el-button>
        <el-button type="danger" :disabled="isFinish" @click="hasFinish">完成</el-button>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isFinish: true, // 是否完成
      isSet: true, // 是否可以进行修改
      timeData: {
        first: [new Date(2016, 9, 10, 8, 0), new Date(2016, 9, 10, 9, 30)],
        second: [new Date(2016, 9, 10, 10, 0), new Date(2016, 9, 10, 11, 30)],
        third: [new Date(2016, 9, 10, 14, 0), new Date(2016, 9, 10, 15, 30)],
        fourth: [new Date(2016, 9, 10, 16, 0), new Date(2016, 9, 10, 17, 30)],
        nightFirst: [new Date(2016, 9, 10, 18, 30), new Date(2016, 9, 10, 20, 0)],
        nightSecond: [new Date(2016, 9, 10, 20, 0), new Date(2016, 9, 10, 21, 30)]
      }
    };
  },
  methods: {
    setTime() {
      (this.isSet = false), (this.isFinish = false);
    },
    hasFinish() {
      let timeList = []
      this.isSet = true
      this.isFinish = true
      for (const iterator in this.timeData) {
        timeList.push(this.timeData[iterator])
      }
      if (timeList.length === 6) {
        this.$store.dispatch('getTimeList', timeList)
      }
      // this.$router.push({ name: "myClass" });  
    },
  }
};
</script>
<style lang="less" scoped>
.timeClass {
  width: 600px;
  padding: 0 20px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .main {
    margin: 0 auto;
    & > div {
      margin: 20px 0;
      label {
        width: 80px;
        display: inline-block;
      }
    }
    div.night {
      margin: 40px 0;
      position: relative;
      &::before {
        position: absolute;
        top: 50%;
        left: 30px;
        content: "";
        width: 400px;
        height: 2px;
        background: #c0c4cc;
      }
      span {
        color: #c0c4cc;
        font-size: 12px;
      }
    }
    footer {
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
