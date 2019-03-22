<template>
  <div class="wrap">
    <el-tabs type="border-card">
      <el-tab-pane label="上课时间管理">
        <setTimeClass/>
      </el-tab-pane>
      <el-tab-pane label="开学时间设置">
        <div class="block">
          <div class="block_content">
            <div class="selectTime">
              <span class="demonstration">开学日期：</span>
              <el-date-picker format="yyyy-MM-dd" v-model="date" type="date" placeholder="请选择开学日期"></el-date-picker>
            </div>
            <el-button type="primary" @click="confirmDate">确 定</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="设置上课班级">
        <div class="setClass">
          <div class="setClass_content">
            <div class="selectClass">
              <span>上课班级：</span>
              <el-select
                v-model="needClassList"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="请输入需要上课班级"
              >
                <el-option v-for="item in needClassList" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
            <el-button type="primary" @click="confirmClass">确 定</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getNowTimes } from "../../util/getTime.js";
import setTimeClass from "../../components/setTimeClass";
export default {
  data() {
    return {
      date: "",
      needClassList: [] // 需要上课的班级
    };
  },
  methods: {
    confirmDate () {
      if (this.date) {
        let startTime = getNowTimes(this.date);
        this.$store.dispatch("setStartTime", startTime);
      } else {
         this.$message.error('请选择开学时间！')
      }
    },
    confirmClass () {
      if (this.needClassList.length) {
        this.$store.dispatch("setNeedClass", this.needClassList);
      } else {
        this.$message.error('请输入需要上课班级！')
      }

    }
  },
  components: {
    setTimeClass
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
  .block, .setClass {
    width: 500px;
    height: 300px;
    margin: 50px auto 0;
    .block_content, .setClass_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-button {
        width: 150px;
        margin: 30px 0;
      }
    }
  }
}
</style>
