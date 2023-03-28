import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: () => import('@/views/login/login.vue') },
  { path: '/register', name: 'register', component: () => import('../views/register/register.vue') },
  { path: '/test', name: 'test', component: () => import('../views/Test.vue') },
  { path: '/statistics', name: 'statistics', component: () => import('@/views/statistics/statistics.vue') },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/Main.vue'),
    children: [

      {
        path: '/a/todo',
        name: 'todo',
        component: () => import('@/views/todo/Todo.vue'),
        children: [
          { path: '/a/:id/todo', name: 'todo-list', component: () => import('@/views/todo/TodoList.vue') },
          { path: '/a/:id/tag/todo', name: 'tag-list', component: () => import('@/views/todo/TodoList.vue') }
        ]
      },
      {
        path: '/b/view',
        name: 'todoView',
        component: () => import('@/views/todo-view/View.vue'),
        children: [
          { path: '/b/view/month', name: 'todoMonth', component: () => import('@/views/todo-view/Month.vue') },
          { path: '/b/view/week', name: 'todoWeek', component: () => import('@/views/todo-view/Week.vue') },
          { path: '/b/view/day', name: 'todoDay', component: () => import('@/views/todo-view/Day.vue') }
        ]
      },
      {
        path: '/c/matrix',
        name: 'matrix',
        component: () => import('@/views/Matrix.vue')
      },
      {
        path: '/d/search',
        name: 'search',
        component: () => import('@/views/search/search.vue')
      },
      {
        path: '/time',
        name: 'time',
        component: () => import('@/views/time/Time.vue')
      }
    ]
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/setting/Setting.vue'),
    children: [
      { path: '/setting/account', name: 'account', component: () => import('@/views/setting/Account.vue') }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (token) {
    if (to.path === '/' || to.path === '/login') {
      next('/a/all/todo')
    } else {
      next()
    }
  } else {
    if (to.path === '/' || to.path === '/login' || to.path === '/register') {
      next()
    } else {
      next('/login')
    }
  }
})
router.afterEach((to, from) => {

})

export default router
