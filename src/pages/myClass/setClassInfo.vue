<template>
  <div class="wrap">
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="上课时间管理">
        <setTimeClass/>
      </el-tab-pane>
      <el-tab-pane label="配置管理">

      </el-tab-pane>
      <el-tab-pane label="角色管理">

      </el-tab-pane>
      <el-tab-pane label="定时任务补偿">
        
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import setTimeClass from '../../components/setTimeClass'
export default {
  data() {
    return {};
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
  }
</style>
