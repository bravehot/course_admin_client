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
        <div class="weekBox">
          <el-form ref="weekForm" label-width="80px" label-position="left">
            <div v-for="(item, index) in addClass.week" :key="index" class="weekBoxContent">
              <el-form-item
                :label="handleWeek(index+1)"
                :rules="{
                required: true, message: '请选择上课星期', trigger: 'blur'
              }"
              >
                <el-select
                  v-model="item.classNums[index]" 
                  placeholder="请选择第几节"
                >
                  <el-option
                    v-for="(item, index) in 7"
                    :key="index"
                    :value="index"
                    :label="handleClass(index)"
                  />
                </el-select>
                <!-- 上课班级用input的远程搜索 -->
                <!-- <el-button
                type="danger"
                @click.prevent="removeWeek(item)"
                class="delect"
                size="small"
                >删除</el-button>-->
              </el-form-item>
              <el-form-item
                label="上课班级"
                :rules="{
                required: true, message: '请输入上课班级', trigger: 'blur'
              }"
              >
                <el-select
                  v-model="item.classNums"
                  multiple
                  filterable
                  allow-create
                  default-first-option
                  placeholder="请上课班级"
                >
                  <el-option
                    v-for="(item, index) in needClassList"
                    :key="index"
                    :value="item"
                    :label="item"
                  />
                </el-select>
                <el-button type='primary' icon='el-icon-plus' circle @click="addClassNames"></el-button>
              </el-form-item>
            </div>
            <el-form-item>
              <el-button type="primary" @click="addWeek">增加</el-button>
            </el-form-item>
          </el-form>
        </div>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      labelPosition: 'left',
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
        week: [],
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
    addClassNames () { // 添加第几节上课
      // this.addClass.week.classNames.push([])
    },
    removeWeek(item) {
      let index = this.addClass.week.indexOf(item);
      if (index !== -1) {
        this.addClass.week.splice(index, 1);
      }
    },
    addWeek() {
      if (this.addClass.week.length === 7) {
        this.$message({
          message: "一周只有7天",
          type: "warning"
        });
        return;
      }
      // 添加
      this.addClass.week.push({
        classNums: [],
        key: Date.now()
      });
      // this.addClass.classNames.push({
      //   value: "",
      //   key: Date.now()
      // });
    },
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
          // type1: {
          //   classRoom: "J7-101"
          //   start: "第一周"
          //   end: "第二十五周"
          //   name: "计算机科学与技术"
          //   num: ["第一节", "第三节", "第四节"]
          //   week: ['星期一', '星期四', '星期五']
          //   weeks: []
          // }
          // type2: {

          // }
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
    width: 410px;
  }
  .el-input,
  .el-select {
    width: 280px;
  }
  .week {
    .selectBox {
      overflow: hidden;
      .line {
        text-align: center;
      }
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
