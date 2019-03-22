<template>
  <div class="wrap">
    <!-- <p>分类、名称、时间、内容、活动分类、是否需要设置提醒</p> -->
    <el-form :model="memoData" :rules="rules" :label-position="labelPosition" ref="memo" label-width="100px">
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="memoData.name"  placeholder="请输入活动名称"></el-input>
      </el-form-item>
      <el-form-item label="活动时间：" prop="time">
        <el-date-picker v-model="memoData.time"  type="datetime" placeholder="请选择日期和时间"></el-date-picker>
        <span class="toast">默认使用当前时间</span>
      </el-form-item>
      <el-form-item label="活动内容：" prop="content">
        <el-input type="textarea"  v-model="memoData.content" placeholder="请输入活动内容"></el-input>
      </el-form-item>
      <el-form-item label="活动分类：" prop="selectType">
        <el-select
          v-model="memoData.selectType"
          :multiple="true"
          :filterable="true"
          :allow-create="true"
          placeholder="请选择活动分类标签"
        >
          <el-option
            v-for="item in memoData.activeTypeData"
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
          v-model="memoData.isRemind"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="打开提醒"
          inactive-text="关闭提醒"
        ></el-switch>
        <span class="warn">注：PC端网页无提醒功能，请到APP端体验</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitData('memo')">提交</el-button>
        <el-button @click="resetData('memo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { ctiveTypeData } from "../../constants/dataList.js";
export default {
  name: "addMemo",
  data() {
    return {
      labelPosition: "left",
      memoData: {
        name: "",
        time: "",
        content: "",
        selectType: [],
        isRemind: true,
        activeTypeData
      },
      rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          time: [
            { message: '请选择活动时间', trigger: 'change' }
          ],
          content: [
            { message: '请选择日期', trigger: 'change' }
          ],
          selectType: [
            { required: true, message: '请选择分类', trigger: 'change' }
          ]
        }
    };
  },
  methods: {
    addActiveType () { // 添加标签内容
      console.log(this.memoData.selectType)
      console.log(this.memoData.activeTypeData)
    },
    submitData(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$message({
            message: '正在添加,请稍后！！！',
            type: 'success'
          });
        } else {
          this.$message({
            message: '请按规范进行填写！！！',
            type: 'warning'
          });
          return false;
        }
      });
    },
    resetData(formName) {
      this.$refs[formName].resetFields();
    },
    addDomain() {
      // this.dynamicValidateForm.domains.push({
      //   value: '',
      //   key: Date.now()
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.wrap {
  margin: 0 auto;
  max-width: 500px;
  padding: 100px 0;
  .el-date-editor,
  .el-select {
    width: 400px;
  }
  .el-switch {
    height: 40px;
    line-height: 30px;
  }
  .warn {
    font-size: 14px;
    color: #ff0000;
  }
  .toast {
    color: #409EFF;
  }
  .addActive {
    float: right;
    margin-top: 15px;
  }
}
</style>
