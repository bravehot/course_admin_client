<template>
  <div class="todoList">
    <div class="todoList_head">
      我的代办事项
      <span :class="{isFinsh: todoList.isFinish }">{{todoList.isFinish ? '已完成' : '未完成'}}</span>
    </div>
    <div class="todoList_main">
      <el-form :model="todoList" :label-position="labelPosition" :rules="rules">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="todoList.name" :disabled="isSet" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：" prop="time">
          <el-time-picker
            v-model="todoList.time"
            :disabled="isSet"
            value-format="hh:mm:ss"
            placeholder="请选择时间"
          />
          <br>
          <span class="toast">默认使用当前时间</span>
        </el-form-item>
        <el-form-item label="活动内容：" prop="content">
          <el-input
            type="textarea"
            :disabled="isSet"
            v-model="todoList.content"
            placeholder="请输入活动内容"
          ></el-input>
        </el-form-item>
        <el-form-item label="活动分类：" prop="selectType">
          <el-select
            v-model="todoList.selectType"
            :multiple="true"
            :filterable="true"
            :allow-create="true"
            placeholder="请选择活动分类标签"
            :disabled="isSet"
          >
            <el-option
              v-for="item in activeTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设置提醒：">
          <el-switch
            style="display: block"
            v-model="todoList.isRemind"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="开"
            inactive-text="关"
            :disabled="isSet"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <div class="buttonBox">
            <el-button type="primary" @click="setStatus" v-if="isSet">修改</el-button>
            <el-button type="primary" @click="addMemoInfo" v-else>保存</el-button>
            <el-button type="primary" @click="addNewMemoInfo" v-if="isSet">新增</el-button>
            <el-button type="danger" @click="deleteMemo" v-if="isDelete">删除</el-button>
            <el-button type="success" @click="handleFinish" v-if="!todoList.isFinish">已完成</el-button>
            <el-button type="danger" @click="handleFinish" v-else>未完成</el-button>
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            small
            :page-size="1"
            layout="prev, pager, next"
            :total="total"
          ></el-pagination>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { activeTypeData } from "../constants/dataList.js";
import { getNowTimes } from "../util/getTime";
import { addMemoInfo, getMemoInfo, updateMemoInfo, deleteThisMemo, setMemoFinish } from "../api/index";
import { mapState } from "vuex";
export default {
  data() {
    return {
      total: 0,
      labelPosition: "top",
      isSet: true,
      isDelete: false,
      isCompleted: false,
      todoList: {
        name: "",
        time: "",
        content: "",
        selectType: [],
        isRemind: true,
        date: getNowTimes(new Date().getTime()),
        isFinish: false
      },
      id: "",
      activeTypeData,
      memoList: [],
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        time: [{ required: true, message: "请选择时间", trigger: "blur" }],
        content: [
          { required: true, message: "请输入待办内容", trigger: "blur" }
        ],
        selectType: [{ required: true, message: "请选择分类", trigger: "blur" }]
      }
    };
  },

  computed: {
    ...mapState(["thisTime"])
  },
  mounted() {
    this.getThisDayMemo(this.todoList.date);
  },
  methods: {
    async deleteMemo() { // 删除此条待办消息
      let result = await deleteThisMemo(this.id ? this.id : this.todoList._id)
      if (result.code === 200) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getThisDayMemo(this.thisTime)
      } else {
        this.$message.error(result.msg);
      }
    },
    async handleFinish() { // 当天待办已完成
      if (this.todoList.isFinish) {
        this.todoList.isFinish = false
      } else {
        this.todoList.isFinish = true
      }
      console.log(this.todoList.isFinish)
      let result =  await setMemoFinish(this.id ? this.id : this.todoList._id, this.todoList.isFinish)
      if (result.code === 200) {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
        this.getThisDayMemo(this.thisTime)
      } else {
        this.$message.error(result.msg);
      }
    },
    addNewMemoInfo() {
      // 修改界面新增待办
      (this.todoList.name = ""),
        (this.todoList.time = ""),
        (this.todoList.content = ""),
        (this.todoList.selectType = []),
        (this.todoList.isRemind = true),
        (this.todoList.date = this.thisTime);
      this.isSet = false;
    },
    handleCurrentChange(event) {
      let index = event - 1;
      this.todoList = this.memoList[index];
    },
    setStatus() { // 设置修改状态
      this.isSet = false;
      this.isDelete = true;
    },
    async addMemoInfo() { // 添加待办的信息
      let username = localStorage.getItem("username");
      this.todoList.date = this.thisTime;
      if (this.isDelete) { // 更新
        let result = await updateMemoInfo({ username, ...this.todoList, _id: this.id ? this.id : this.todoList._id });
        if (result.code === 200) {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        } else {
          this.$message.error(result.msg);
        }
        this.isSet = true
      } else { // 新增
        let result = await addMemoInfo({ username, ...this.todoList });
        if (result.code === 200) {
          this.getThisDayMemo(this.thisTime);
          this.todoList = result.data[0];
          this.id = result.data[0]._id;
          this.memoList = result.data;
        } else {
          this.$message.error(result.msg);
        }
      }
    },
    async getThisDayMemo(date) {
      let username = localStorage.getItem("username");
      let result = await getMemoInfo(username, date);
      if (result.code === 200) {
        this.memoList = result.data;
        this.todoList = result.data[0];
        this.total = result.data.length;
        this.isSet = true;
      } else {
        (this.todoList.name = ""),
          (this.todoList.time = ""),
          (this.todoList.content = ""),
          (this.todoList.selectType = []),
          (this.todoList.isRemind = true),
          (this.todoList.date = getNowTimes(new Date().getTime()));
        this.$message({
          message: result.msg,
          type: "warning"
        });
        this.isSet = false;
      }
    }
  },
  watch: {
    async thisTime(newVal) {
      if (newVal) {
        let username = localStorage.getItem("username");
        let date = newVal;
        let result = await getMemoInfo(username, date);
        if (result.code === 200) {
          this.memoList = result.data;
          this.todoList = result.data[0];
          this.total = result.data.length;
          this.isSet = true;
          this.isDelete = false;
        } else {
          console.log(1111);
          this.isSet = false;
          this.isDelete = false;
          (this.todoList.name = ""),
            (this.todoList.time = ""),
            (this.todoList.content = ""),
            (this.todoList.selectType = []),
            (this.todoList.isRemind = true),
            (this.todoList.date = getNowTimes(new Date().getTime()));
          this.$message({
            message: result.msg,
            type: "warning"
          });
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
.todoList {
  width: 28%;
  height: 100%;
  box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
  .todoList_head {
    font: bold 16px/30px "微软雅黑";
    text-align: center;
    padding-top: 10px;
    span {
      display: inline-block;
      font-size: 12px;
      width: 40px;
      color: #ffffff;
      transform: scale(0.8);
      border-radius: 10px;
    }
    & > span:last-child {
      background: #f56c6c;
      &.isFinsh {
        background: #67C23A;
      }
    }
  }
  .todoList_main {
    padding: 0 10px;
    .el-switch {
      display: flex;
      align-items: center;
      height: 40px;
      line-height: 40px;
    }
    .toast {
      color: #409eff;
    }
    .buttonBox {
      display: flex;
      justify-content: space-around;
      .el-button {
        width: 85px;
      }
    }
    .el-pagination {
      margin-top: 30px;
      text-align: center;
    }
  }
}
@media screen and (max-width: 680px){
  .el-date-editor {
    width: 100%;
  }
}
</style>
