<template>
  <el-container id="app">
      <el-header>
        <menuHead/>
      </el-header>
      <el-container>
        <menuNavLeft/>
        <el-container>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </el-container>
      </el-container>
  </el-container>
</template>

<script>
import reset from './assets/css/reset.css'
import menuHead from './components/menuHead'
import menuNavLeft from './components/menuNavLeft'
export default {
  name: 'app',
  components: {
    menuHead,
    menuNavLeft
  }
}
</script>
<style lang="less" scoped>
  .el-header {
    padding: 0;
  }
  .el-container {
    height: auto;
  }
</style>
