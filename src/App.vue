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
import { handleThisWeek } from './util/getTime.js'
export default {
  name: "app",
  mounted() {
    this.ishaveToken();
    this.getUser();
    this.connectSocket();
  },
  methods: {
    ishaveToken() {
      // 判断是否自动登录
      let token = getCookie("token");
      if (token) {
        this.$router.push("/class");
      } else {
        this.$router.push("/login");
      }
    },
    getUser() {
      this.$store.dispatch("getUserInfo");
    },
    connectSocket() {
      if (window.goEasy) {
        this.$goEasy = window.goEasy;
        let username = localStorage.getItem("username")
        this.$goEasy.subscribe({
          channel: "sendClassInfo",
          onMessage: (message) => {
          this.$notify({
            title: '课程提醒',
            dangerouslyUseHTMLString: true,
            type: 'success',
            message: `<strong>早上好</strong> <br/> 
            今天是${handleThisWeek()},
            您今天共有${message.content}门课 <br/>
            点击查看详情`,
            duration: 0,
            onClick: () => {
              this.$router.push('/class')
            }
          });
          }
        });
      }
    }
  },
  // scheduleCronstyle();
  // 使用socket 通信
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
@media screen and (max-width: 680px){
  font-size: 20px !important;
}
</style>
