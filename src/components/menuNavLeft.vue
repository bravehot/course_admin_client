<template>
  <el-aside>
    <el-menu @select='selectMenu' unique-opened :router="true" :collapse-transition="true" default-active="1-1" class="el-menu-vertical-demo"  :collapse="isCollapse">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">课表中心</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" :route='{name: "myClass"}' :class="[path === '/class' ? 'is-active' : ' ']">我的课表</el-menu-item>
          <el-menu-item index="1-2" :route='{name: "addClass"}' :class="[path === '/addClass' ? 'is-active' : ' ']">添加课表</el-menu-item>
          <el-menu-item index="1-3" :route='{name: "setClassInfo"}' :class="[path === '/setClassInfo' ? 'is-active' : ' ']">设置</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">上课记录</span>
      </el-menu-item>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-edit"></i>
          <span slot="title">代办事项</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" :route='{name: "addMemo"}'>添加事项</el-menu-item>
          <el-menu-item index="3-2" :route='{name: "myMemo"}'>我的代办</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">个人中心</span>
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
  },
  watch: {
    '$route': 'setPath'
  },
  methods: {  
    selectMenu(index, indexPath) {
      console.log(index, indexPath)
    },
    setPath() {
      this.path = this.$router.history.current.fullPath
    }
  }

}
</script>
<style lang="less" scoped>
  .el-aside {
    margin-top: 2px;
  }

</style>
