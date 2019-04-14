<template>
  <div class="addWeekInfo">
    <el-form ref="weekInfoForm" :model="week[indexs]" label-width="80px">
      <el-form-item v-for="(item, index) in classData" :key="index" :label='item+":"'>
        <el-select
          v-model="week[indexs][index]"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择上课班级">
          <el-option
            v-for="(item, index) in needClassList"
            :key="index"
            :value="item">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { classData } from "../constants/dataList.js";
import { mapState } from 'vuex'
export default {
  data() {
    return {
      weekInfo: {

      },
      classData,
    };
  },
  props: {
    week: Array,
    indexs: Number
  },
  computed: {
    ...mapState(['needClassList'])
  },
  mounted () {
  }
};
</script>
<style lang="less" scoped>
  .addWeekInfo {
    .el-form-item {
      margin: 20px 0;
    }
  }
</style>
