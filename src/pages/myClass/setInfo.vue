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
              <el-date-picker
                format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                v-model="date"
                type="date"
                placeholder="请选择开学日期"
              ></el-date-picker>
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
              <div class="tagContent">
                <el-tag
                  v-for="(tag, index) in needClassList"
                  :key="index"
                  closable
                  @close="handleClose(tag)"
                >{{tag}}</el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                ></el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改信息">
        <div class="setInfo">
          <el-form ref="setPwd" :model="setPwd" label-width="100px" label-position="left">
            <el-form-item
              label="用户名："
              :rules="[ { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' } ]"
            >
              <el-input v-model="setPwd.names" placeholder="请输入新的用户名："></el-input>
            </el-form-item>
            <el-form-item label="当前密码：">
              <el-input
                v-model="setPwd.pwd"
                placeholder="请验证当前密码："
                type="password"
                @blur="checkPassword"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码：">
              <el-input v-model="setPwd.newPwd" placeholder="请输入新密码：" :disabled="isSetPwd"></el-input>
            </el-form-item>
            <el-form-item label="确认密码：">
              <el-input
                v-model="setPwd.againPwd"
                placeholder="请再输一次新密码："
                :disabled="isSetPwd"
                @blur="checkNewPwd"
              ></el-input>
            </el-form-item>
            <div class="buttonBox">
              <el-button type="primary" @click="handleInfo">修&nbsp;&nbsp;&nbsp;改</el-button>
            </div>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getNowTimes } from "../../util/getTime.js";
import { mudificationPwd, setUserInfo } from "../../api/index.js";
import setTimeClass from "../../components/setTimeClass";
export default {
  data() {
    return {
      isSetPwd: true,
      date: "",
      needClassLists: [], // 需要上课的班级
      setPwd: {
        names: "",
        pwd: "",
        newPwd: "",
        againPwd: ""
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    ...mapState(["startTime", "needClassList"])
  },
  mounted() {
    this.date = this.startTime;
    this.needClassLists = this.needClassList;
  },
  methods: {
    handleClose(tag) {
      this.needClassLists.splice(this.needClassLists.indexOf(tag), 1);
      let username = localStorage.getItem("username");
      this.$store.dispatch("setNeedClass", {
        username,
        classNames: this.needClassLists
      });
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      if (this.inputValue) {
        let username = localStorage.getItem("username");
        this.needClassLists.push(this.inputValue);
        this.$store.dispatch("setNeedClass", {
          username,
          classNames: this.needClassLists
        });
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    handleInfo() {
      // 修改信息请求
    },
    // pwd check again
    checkNewPwd() {},
    // verification pwd
    async checkPassword() {
      let username = localStorage.getItem("username");
      let result = await mudificationPwd();
    },
    confirmDate() {
      if (this.date) {
        let startTime = getNowTimes(this.date);
        this.$store.dispatch("setStartTime", startTime);
      } else {
        this.$message.error("请选择开学时间！");
      }
    },
    confirmClass() {
      if (this.needClassLists.length) {
        let username = localStorage.getItem("username");
        this.$store.dispatch("setNeedClass", {
          username,
          classNames: this.needClassLists
        });
      } else {
        this.$message.error("请输入需要上课班级！");
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
  .block,
  .setClass,
  .setInfo {
    width: 500px;
    height: 300px;
    margin: 50px auto 0;
    .block_content,
    .setClass_content {
      display: flex;
      flex-direction: column;
      align-items: center;
      .el-button {
        margin: 30px 10px;
      }
      span.el-tag {
        margin: 0 10px 10px;
        
      }
      .button-new-tag {
        margin: 0 10px;
      }
      .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
      }
      .selectClass {
        display: flex;
        & > span {
          width: 100px;
          line-height: 33px;
        }
      }
    }
  }
  .setInfo {
    .buttonBox {
      button {
        font-size: 20px;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>
