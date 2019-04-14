<template>
  <div class="addClass">
    <el-form ref="classForm" :model="addClass" :rules="rules" label-width="120px">
      <el-form-item label="课程名称：" prop="name">
        <el-input v-model="addClass.name" placeholder="请输入课程名称"></el-input>
      </el-form-item>
      <el-form-item label="上课教室：" prop="classRoom">
        <el-input v-model="addClass.classRoom" placeholder="请输入上课教室"></el-input>
      </el-form-item>
      <el-form-item label="上课星期：" required>
        <el-tabs v-model="activeWeek" type="border-card" @tab-click="handleClick">
          <el-tab-pane :label="item" :name="item" v-for="(item, index) in weekList" :key=index><addWeekInfo :week=addClass.week :indexs=index /></el-tab-pane>
        </el-tabs>
      </el-form-item>
      <el-form-item label="上课周：" class="week" prop="weeks">
        <div v-if="isSelect" class="selectBox">
          <el-col :span="10">
            <el-form-item prop="start">
              <el-select v-model="addClass.start" placeholder="请选择开始周">
                <el-option
                  v-for="(item, index) in 25"
                  :key="index"
                  :value="item"
                  :label="'第' + item + '周'"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="10">
            <el-form-item prop="end">
              <el-select v-model="addClass.end" placeholder="请选择结束周">
                <el-option
                  v-for="(item, index) in 25"
                  :key="index"
                  :value="item"
                  :label="'第' + item + '周'"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </div>
        <el-select
          :class="{normal: !isSelect}"
          v-else
          v-model="addClass.weeks"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择第几周上课"
        >
          <el-option v-for="(item, index) in weekData" :key="index" :value="item">{{item}}</el-option>
        </el-select>
        <el-button type="info" size="small" @click="selectType" class="selectButton">切换选择模式</el-button>
      </el-form-item>
      <div class="buttonBox">
        <el-button type="primary" @click="submitData('classForm')">提交</el-button>
        <el-button @click="resetData('classForm')">重置</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import { classData, weekData, weekList } from "../../constants/dataList.js";
import { handleWeek, handleClass } from "../../util/getTime.js";
import addWeekInfo from '../../components/addWeekInfo'
import { mapState } from "vuex";
export default {
  data() {
    return {
      activeWeek: '星期一',
      labelPosition: "left",
      weekData,
      weekList,
      isSelect: true,
      rules: {
        name: [{ required: true, message: "请输入课程名称", trigger: "blur" }],
        classRoom: [
          { required: true, message: "请输入上课教室", trigger: "blur" }
        ],
        num: [{ required: true, message: "请选择第几节上课", trigger: "blur" }],
        weeks: [{ required: true, message: "请选择上课周", trigger: "blur" }],
        start: [{ required: true, message: "请选择开始周", trigger: "change" }],
        end: [{ required: true, message: "请选择结束周", trigger: "change" }]
      },
      addClass: {
        name: "",
        classRoom: "",
        classNames: [],
        week: [
          {}, {}, {}, {}, {}, {}, {}
        ],
        num: "",
        start: "",
        end: "",
        weeks: ""
      }
    };
  },
  computed: {
    ...mapState(["needClassList"])
  },
  methods: {
    handleClass,
    handleWeek,
    removeWeek(item) {
      let index = this.addClass.week.indexOf(item);
      if (index !== -1) {
        this.addClass.week.splice(index, 1);
      }
    },
    handleClick() {},
    selectType() {
      this.isSelect = !this.isSelect;
    },
    submitData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.addClass);
          this.$message({
            message: "正在添加,请稍后！！！",
            type: "success"
          });
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
    },
    resetWeek(formName) {
      this.$refs[formName].resetFields();
    }
  },
  watch: {},
  components: {
    addWeekInfo
  }
};
</script>
<style lang="less" scoped>
.addClass {
  padding: 30px 20px;
  display: inline-block;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
  margin: 50px auto 0;
  & > .el-form {
    // width: 410px;
  }
  .el-input,
  .el-select {
    width: 280px;
  }
  .week {
    .selectBox {
      overflow: hidden;
    }
    .el-select {
      width: 140px;
    }
    .normal {
      width: 280px;
    }
    .switchType {
      .el-button {
        margin: 20px auto 0;
      }
    }
  }
  .warn {
    font-size: 14px;
    color: #ff0000;
  }
  .weekBox {
    .weekBoxContent {
      display: flex;
    }
    .el-select {
      width: 140px;
    }
    .el-form-item {
      margin: 15px 0;
    }
    /* .delect {
      display: block;
      margin: 20px auto;
    } */
  }
  .selectButton {
    margin-top: 20px;
    display: block;
  }
  .buttonBox {
    margin-top: 50px;
    display: flex;
    justify-content: space-around;
  }
}
</style>
