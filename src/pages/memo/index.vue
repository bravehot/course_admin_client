<template>
  <div class="wrap">
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
