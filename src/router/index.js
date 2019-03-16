import VueRouter from 'vue-router'
const myClass = () => import('../pages/myClass/index.vue')
const addMemo = () => import('../pages/memo/addMemo.vue')
const myMemo = () => import('../pages/memo/index.vue')
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'myClass',
      component: myClass
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