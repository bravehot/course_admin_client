<template>
  <div class="wrap">
    <p class="title">上&nbsp;课&nbsp;时&nbsp;间&nbsp;表</p>
    <header>
      <div>
        <span class="data">日期</span>
        <span class="time">时间</span>
      </div>
      <span v-for="(item, index) in weekList" :key="index">{{item}}</span>
    </header>
  </div>
</template>
<script>
export default {
  name: 'myClass',
  data () {
    return {
      weekList: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    }
  }
}
</script>
<style lang="less" scoped>
  .wrap {
    min-width: 960px;
    height: 100%;
    box-shadow: 0 0 10px rgba(208, 208, 208, 0.5);
    margin: 20px 20px;
    padding: 20px 40px;
    box-sizing: border-box;
    .title {
      font: bold 24px/30px '微软雅黑';
      text-align: center;
      padding: 20px 0;
    }
    header {
      overflow: hidden;
      border: 1px solid;
      & > div {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        // background: linear-gradient(15deg, transparent 49.5%, deeppink 49.5%, deeppink 50.5%, transparent 50.5%);
        &::before {
          content: '';
          position: absolute;
          top: 50%;
          width: 110px;
          height: 1px;
          box-sizing:border-box;
          border-bottom:1px solid #333;
          transform: rotateZ(14deg);
        }
        span {
          font: 100 12px '微软雅黑';
          height: 15px;
        }
        .data {
          text-align: right;
          padding-right: 15px;
        }
        .time {
          text-align: left;
          padding-left: 15px;
        }
      }
      & > div, & > span {
        float: left;
        width: 108px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-right: 1px solid;
      }
      & > span {
        display: inline-block;
      }
      & > span:last-child {
        border-right: none;
      }

    }
  }

</style>
