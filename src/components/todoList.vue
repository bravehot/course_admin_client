<template>
  <div class="todoList">
    <div class="todoList_head">
      我的代办事项
      <span v-if="isCompleted">未完成</span>
      <span v-else>已完成</span>
    </div>
    <div class="todoList_main">
      <el-form :model="todoList" :label-position="labelPosition">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="todoList.name" :disabled="isSet" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item label="活动时间：" prop="time">
          <el-date-picker v-model="todoList.time" :disabled="isSet" type="datetime" placeholder="请选择日期和时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动内容：" prop="content">
          <el-input type="textarea" :disabled="isSet" v-model="todoList.content" placeholder="请输入活动内容"></el-input>
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
              v-for="item in todoList.activeTypeData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <!-- <el-button class="addActive" type='primary' size='small' @click="addActiveType">添加自定义标签</el-button> -->
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
            <el-button type="primary" @click="hasStatus" v-else>完成</el-button>
            <el-button type="danger" @click="Completed" :disabled=!isCompleted>已完成</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {activeTypeData} from "../constants/dataList.js";
export default {
  data() {
    return {
      labelPosition: "top",
      isSet: true,
      isCompleted: false,
      todoList: {
        name: "",
        time: "",
        content: "",
        selectType: [],
        isRemind: true,
        activeTypeData
      }
    };
  },
  mounted () {

  },
  computed: {
    ...mapState(['memoList'])
  },
  watch: {
    memoList (val) {
      console.log(val)
    }
  },
  methods: {
    setStatus () { // 设置修改状态
      this.isSet = false
    },
    hasStatus () { // 修改完成后
      this.isSet = true
    },
    Completed () {

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
      transform: scale(.8);
      border-radius: 10px;
    }   
    &>span:first-child {
      background: #E6A23C;
    }
    &>span:last-child {
      background: #F56C6C;
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
    .buttonBox {
      display: flex;
      justify-content: space-around ;
      .el-button {
        width: 85px;
      }
    }
  }
}
</style>
