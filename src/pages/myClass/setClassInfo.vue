<template>
  <div class="setClassInfo">
    <div class="searchClassName" v-if="isSetClassName">
      <div class="content">
        <label for="className">课程名称：</label>
        <el-input type="text" v-model="className" id="className" placeholder="请输入修改的课程名称"/>
      </div>
      <el-button type="primary" class="next" @click="getThisWeekInfo">下一步</el-button>
    </div>
    <el-form
      v-else
      ref="classForm"
      :model="setClass"
      :rules="rules"
      label-width="120px"
      class="formContent"
    >
      <el-form-item label="课程名称：" prop="name">
        <el-input v-model="setClass.name"></el-input>
      </el-form-item>
      <el-form-item label="上课教室：" prop="classRoom">
        <el-input v-model="setClass.classRoom"></el-input>
      </el-form-item>
      <el-form-item label="上课星期：" required>
        <el-tabs v-model="activeWeek" type="border-card">
          <el-tab-pane :label="item" :name="item" v-for="(item, index) in weekList" :key="index">
            <addWeekInfo :week="setClass.week" :indexs="index"/>
          </el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="上课周：" class="week" prop="weeks">
        <el-select
          class="normal"
          v-model="setClass.weeks"
          multiple
          filterable
          allow-create
          default-first-option
        >
          <el-option
            v-for="(item, index) in 25"
            :key="index"
            :value="'第' + item + '周'"
            :label="'第' + item + '周'"
          />
        </el-select>
      </el-form-item>
      <div class="buttonBox">
        <el-button type="primary" @click="submitData('classForm')">修 改</el-button>
        <el-button type="danger" @click="deleteInfo">删 除</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { classData, weekData, weekList } from "../../constants/dataList.js";
import addWeekInfo from "../../components/addWeekInfo";
import { mapState } from "vuex";
import { updateClassInfo, deleteClassInfo } from "../../api/index";
export default {
  name: "setClassInfo",
  data() {
    return {
      classData,
      weekData,
      weekList,
      activeWeek: "星期一",
      labelPosition: "left",
      isSetClassName: true,
      className: "",
      setClass: {
        name: "",
        classRoom: "",
        week: [{}, {}, {}, {}, {}, {}, {}],
        weeks: "",
        _id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        classRoom: [
          { required: true, message: "请输入上课教室", trigger: "blur" }
        ],
        weeks: [{ required: true, message: "请选择上课周", trigger: "blur" }]
      }
    };
  },
  computed: {
    ...mapState(["thisClassInfo", "errMsg"])
  },
  methods: {
    async deleteInfo() { // 删除课程信息
      if (this.className && this.setClass._id) {
        let result = await deleteClassInfo(this.setClass._id);
        if (result.code === 200) {
          this.$message({
            message: "删除成功！！！",
            type: "success"
          });
          this.isSetClassName = true;
        } else {
          this.$message.error(result.msg);
        }
      } else {
        this.$message({
          message: "请输入要删除的课程名称",
          type: "warning"
        });
      }
    },
    getThisWeekInfo() {
      if (this.className) {
        let username = localStorage.getItem("username");
        let className = this.className;
        this.$store.dispatch("getThisClassInfo", { username, className });
      } else {
        this.$message({
          message: "请输入课程名称！！！",
          type: "warning"
        });
      }
    },
    submitData(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          let username = localStorage.getItem("username");
          let result = await updateClassInfo({ username, ...this.setClass });
          if (result.code === 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isSetClassName = true;
          } else {
            this.$message.error(result.msg);
          }
        } else {
          this.$message({
            message: "请按规范进行填写！！！",
            type: "warning"
          });
          return false;
        }
      });
    },
    resetData(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {
    thisClassInfo(newVal) {
      this.isSetClassName = false;
      this.setClass.name = newVal.name;
      this.setClass.classRoom = newVal.classRoom;
      this.setClass.week = newVal.week;
      this.setClass.weeks = newVal.weeksName.split();
      this.setClass._id = newVal._id;
    },
    errMsg(newVal) {
      this.$message.error(newVal);
      this.className = "";
    }
  },
  beforeRouteLeave(to, from, next) { //导航守卫，离开页面时更改状态
    this.isSetClassName = true;
    this.className = "";
    next();
  },
  beforeRouteEnter(to, from, next) { //导航守卫，进入页面时更改状态
    next(vm => {
      if (vm.$route.params.name) {
        vm.className = vm.$route.params.name;
      } else {
        vm.className = "";
      }
    });
  },
  components: {
    addWeekInfo
  }
};
</script>
<style lang="less" scoped>
.setClassInfo {
  width: 980px;
  height: 100vh;
  padding: 30px 20px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
  margin: 50px auto 0;
  box-sizing: border-box;
  .searchClassName {
    width: 350px;
    margin: 50px auto;
    .content {
      display: flex;
      label {
        display: inline-block;
        width: 120px;
        line-height: 40px;
        font-size: 14px;
      }
    }
  }
  .formContent {
    width: 740px;
    margin: 0 auto;
    .el-input {
      width: 280px;
    }
    .buttonBox {
      margin-top: 50px;
      display: flex;
      justify-content: space-around;
      .el-button {
        font-size: 20px;
        width: 200px;
      }
    }
  }
  .next {
    display: block;
    margin: 40px auto 0;
  }
}
</style>
