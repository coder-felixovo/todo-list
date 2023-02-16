// 二级路由：账号与安全
const account = {
  path: '/setting/account',
  name: 'account',
  component: () => import('@/views/setting/Account.vue')
}
const about = {
  path: '/setting/about',
  name: 'about',
  component: () => import('@/views/setting/About.vue')
}

// 一级路由：设置页面
export const setting = {
  path: '/setting',
  name: 'setting',
  component: () => import('@/views/setting/Setting.vue'),
  children: [account, about]
}
