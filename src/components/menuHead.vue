<template>
  <div class="wrap">
      <img class="avatar" src="../assets/img/logo.png" alt="">
      <!-- <i :class="[isActive ? activeClass : '', errorClass]" @click="handleLeftNav" v-if="handleLeftNav"></i> -->
      <i :class="[!isCollapse ? 'iconfont icon-hanbaocaidanzhedie' : 'iconfont icon-hanbaocaidanzhedie rotate']" @click="handleLeftNav" ></i>
      <p class="describe">山东科技大学——课表管理中心</p>
  </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    name: 'menuHead',
    data () {
      return {

      }
    },
    computed: {
      ...mapState(['isCollapse'])
    },
    methods: {
      handleLeftNav() {
        this.$store.dispatch('changeCollapse')
      }
    }
    
}
</script>

<style lang="less" scoped>
  div.wrap {
    display: flex;
    height: 60px;
    background:#9FD2E8;
    border-bottom: 2px solid #3f3f3f;
    i {
      cursor: pointer;
      line-height: 60px;
      margin-right: 60px;
      transition: transform 1s;
      &.rotate {
        transform: rotate(90deg)
      }

    }
    img.avatar {
      width: 50px;
      height: 50px;
      border-radius: 40%;
      margin: 5px 150px 0 20px
    }
    p.describe {
      font: bold 36px '微软雅黑';
      line-height: 60px;
    }
  }
</style>

