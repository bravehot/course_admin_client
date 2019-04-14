<template>
  <div class="wrap">
    <div class="top">
      <div>
        <label for="type">分类：</label>
        <el-input 
          id='type' 
          v-model="type"
          placeholder="请选择分类" 
          clearable>
        </el-input>
      </div>
      <div>
        <label for="type">时间：</label>
        <el-input
          placeholder="请输入内容"
          v-model="time"
          clearable>
        </el-input>
      </div>
      <div>
        <label for="name">名称：</label>
        <el-input
          placeholder="请输入名称"
          v-model="name"
          clearable>
        </el-input>
      </div>
    </div>
    <el-button class="check" type="primary"> 查 &nbsp;&nbsp;询</el-button>
    <div class="content">
      <Calendar/>
      <TodoList/>
    </div>
  </div>
</template>
<script>
import Calendar from '../../components/calendar'
import TodoList from '../../components/todoList'
export default {
  data () {
    return {
      type: '',
      name: '',
      time: ''
    }
  },
  components: {
    Calendar,
    TodoList
  }
}
</script>

<style lang="less" scoped>
  .wrap {
    padding: 50px;
    width: 100%;
    // height: 100%;
    .top {
      display: flex;
      justify-content: space-around;
      & > div {
        display: flex;
        label {
          width: 50px;
          white-space: nowrap;
          line-height: 40px;
        }
      }
    }
    .check {
      font-size: 18px;
      width: 200px;
      display: block;
      margin: 20px auto 0;
    }
    .content {
      margin-top: 50px;
      display: flex;
      justify-content: space-between;
    }
  }
</style>
