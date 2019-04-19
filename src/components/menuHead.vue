<template>
  <div class="wrap">
    <img class="schoolAvatar" src="../assets/img/logo.png" alt="校徽">
    <!-- <i :class="[isActive ? activeClass : '', errorClass]" @click="handleLeftNav" v-if="handleLeftNav"></i> -->
    <i
      :class="[!isCollapse ? 'iconfont icon-hanbaocaidanzhedie' : 'iconfont icon-hanbaocaidanzhedie rotate']"
      @click="handleLeftNav"
    ></i>
    <p class="describe">山东科技大学 — 课表管理中心</p>
    <div class="avater">
      <el-dropdown>
        <span class="el-dropdown-link">
          您好 {{teacherName}} 老师
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to="/setClassInfo">设置</router-link>
          </el-dropdown-item>
          <el-dropdown-item>
            <router-link to="/setClassInfo">更改密码</router-link>
          </el-dropdown-item>
          <el-dropdown-item >
            <span @click="outLogin">退出登录</span>
            </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getCookie, deleteCookie } from '../util/handleCookie.js'
export default {
  name: "menuHead",
  data() {
    return {
      teacherName: ''
    };
  },
  computed: {
    ...mapState(["isCollapse", "username"])
  },
  methods: {
    handleLeftNav() {
      this.$store.dispatch("changeCollapse");
    },
    outLogin () { // 退出登录
      if (getCookie('token')) {
        deleteCookie('token') 
        this.$router.push('/')
      }
    }
  },
  watch: {
    username(val) {
      console.log(val)
      this.teacherName = val
    }
  }
};
</script>

<style lang="less" scoped>
div.wrap {
  display: flex;
  position: relative;
  height: 90px;
  background: #b8e5f8;
  border-bottom: 2px solid #3f3f3f;
  padding: 0 2%;
  & > i {
    cursor: pointer;
    line-height: 90px;
    margin: 0 60px 0 20px;
    transition: transform 1s;
    &.rotate {
      transform: rotate(90deg);
    }
  }
  img.schoolAvatar {
    height: 60px;
    padding: 15px 0;
  }
  p.describe {
    font-weight: bold;
    font-size: 36px;
    line-height: 90px;
  }
  div.avater {
    height: 60px;
    position: absolute;
    right: 40px;
    bottom: 10px;
    line-height: 60px;
    .el-dropdown {
      height: 100%;
      & > span {
        font-weight: bold;
      }
    }
  }
}
</style>

