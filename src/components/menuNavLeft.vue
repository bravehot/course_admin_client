<template>
  <el-aside>
    <el-menu  unique-opened :router="true" :collapse-transition="true" :default-active=$route.path  :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">课表中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/class" :route='{name: "myClass"}' :class="[path === '/class' ? 'is-active' : ' ']">我的课表</el-menu-item>
          <el-menu-item index="/addClass" :route='{name: "addClass"}' :class="[path === '/addClass' ? 'is-active' : ' ']">添加课表</el-menu-item>
          <el-menu-item index="/setClassInfo" :route='{name: "setClassInfo"}' :class="[path === '/setClassInfo' ? 'is-active' : ' ']">修改课表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">待办事项</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/addMemo" :route='{name: "addMemo"}'>添加事项</el-menu-item>
          <el-menu-item index="/myMemo" :route='{name: "myMemo"}'>我的待办</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/setInfo">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      path: ''
    }
  },
  computed: {
    ...mapState(['isCollapse'])
  },
  mounted () {
    console.log(this.$route.path) 
  },
  watch: {
  },
  methods: {  
  }

}
</script>
<style lang="less" scoped>
  .el-aside {
    margin-top: 2px;
  }
  .el-menu {
    height: 100%
  }
  @media screen and (max-width:680px){ 
    .el-aside {
      // display: none;
      position: absolute;
      top: 90px;
      z-index: 10;
      width: 100% !important;
      margin: 0 auto;
      text-align: center;
      .el-menu--collapse {
        position: fixed;
        top: 100px;
        left: 5px;
        height: 170px;
        border-radius: 10px;
        background: #b8e5f8;
        opacity: 0.5;
      }
      .el-menu > .el-submenu > .el-submenu__title span{
        font-size: 20px;
      }
      .el-menu > .el-submenu .el-menu-item {
        font-size: 18px;
      }
      .el-menu-item {
        font-size: 18px;
      }
    }
  }
</style>
