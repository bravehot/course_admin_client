<template>
  <el-container id="app">
    <div v-if="$route.path !== '/login'">
      <el-header height="90px">
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
    </div>
    <Login v-else/>
  </el-container>
</template>

<script>
import reset from "./assets/css/reset.css";
import menuHead from "./components/menuHead";
import menuNavLeft from "./components/menuNavLeft";
import Login from "../src/pages/login";
import { getCookie } from "./util/handleCookie.js";
export default {
  name: "app",
  mounted() {
    this.ishaveToken();
    this.getUser()
  },
  methods: {
    ishaveToken() { // 判断是否自动登录
      let token = getCookie("token");
      if (token) {
        this.$router.push("/class");
      } else {
        this.$router.push("/login");
      }
    },
    getUser() {
      this.$store.dispatch('getUserInfo')
    }
  },
  components: {
    menuHead,
    menuNavLeft,
    Login
  }
};
</script>
<style lang="less" scoped>
#app {
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
    color: #606266;
  & > div {
    width: 100%;
  }
}
#app:hover {
  cursor: url(https://cdn.jsdelivr.net/gh/Tomotoes/images/blog/default.cur),
    auto !important;
}
.el-header {
  padding: 0;
}
.el-container {
  height: auto;
}
</style>
