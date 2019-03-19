<template>
  <div class="wrap">
    <el-tabs type="border-card" >
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
            <el-button type='primary' @click="confirmDate">确 定</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="角色管理"></el-tab-pane>
      <el-tab-pane label="定时任务补偿"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {getNowTimes} from '../../util/getTime.js'
import setTimeClass from "../../components/setTimeClass";
export default {
  data() {
    return {
      date: ''
    };
  },
  methods: {
    confirmDate () {
      console.log(getNowTimes(this.date))
      
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
  .block {
    width: 500px;
    height: 300px;
    margin: 100px auto 0;
    .block_content {
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
