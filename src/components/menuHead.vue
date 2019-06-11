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
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          您好 {{names}} 老师
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="setting">设置</el-dropdown-item>
          <el-dropdown-item command="setInfo">更改信息</el-dropdown-item>
          <el-dropdown-item command="outLogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getCookie, deleteCookie } from "../util/handleCookie.js";
export default {
  name: "menuHead",
  data () {
    return {
      names: localStorage.getItem("username")
    }
  },
  computed: {
    ...mapState(["isCollapse", "username"])
  },
  mounted() {
    this.initUsername();
  },
  methods: {
    initUsername() {
      if (this.$store.state.username) {
        let username = this.$store.state.username;
        localStorage.setItem("username", username);
        this.names = localStorage.getItem("username");
      }
    },
    handleCommand(command) {
      switch (command) {
        case "setting":
          this.$router.push("/setClassInfo");
          break;
        case "setInfo":
          this.$router.push("/setClassInfo");
          break;
        case "outLogin":
          this.outLogin();
          localStorage.removeItem("username");
          break;
        default:
          break;
      }
    },
    handleLeftNav() {
      this.$store.dispatch("changeCollapse");
    },
    outLogin() {
      // 退出登录
      if (getCookie("token")) {
        deleteCookie("token");
        this.$router.push("/");
      }
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
    margin: 0 60px 0 80px;
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
  .el-dropdown-link {
    font-size: 16px;
    line-height: 20px;
  }
}
// mobile 
@media screen and (max-width: 680px){
  div.wrap{
    .describe {
      display: none
    }
    i {
      margin: 0 20px 0 20px;
    }
    .avater {
      right: 0px !important;
      bottom: -10px !important;
      i {
        margin: 0;
      }
    }
  }
}
</style>

