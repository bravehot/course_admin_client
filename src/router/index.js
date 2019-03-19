import VueRouter from 'vue-router'
// 课表中心
const myClass = () => import('../pages/myClass/index.vue')
const addClass = () => import('../pages/myClass/addClass.vue')
const setClassInfo = () => import('../pages/myClass/setClassInfo.vue')
const addMemo = () => import('../pages/memo/addMemo.vue')
const myMemo = () => import('../pages/memo/index.vue')
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/class'
    },
    {
      path: '/class',
      name: 'myClass',
      component: myClass,
    },
    {
      path: '/addClass',
      name: 'addClass',
      component: addClass,
    },
    {
      path: '/setClassInfo',
      name: 'setClassInfo',
      component: setClassInfo,
    },
    {
      path: '/addMemo',
      name: 'addMemo',
      component: addMemo
    },
    {
      path: '/myMemo',
      name: 'myMemo',
      component: myMemo
    }

  ]
})
export default router