import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../components/Signup.vue')
  },
  {
    path: '/',
    name: 'login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../components/ForgotPassword.vue')
  },
  {
    path: '/AllPoducts',
    name: 'AllPoducts',
    component: () => import('@/components/AllPoducts.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('@/components/Home.vue')
  },
  {
    path: '/testEdit',
    name: 'testEdit',
    component: () => import('@/components/testEdit.vue')
  },
  {
    path: '/emailConf',
    name: 'emailConf',
    component: () => import('@/components/EmailConf.vue')
  },
  {
    path: '/product',
    name: 'product',
    component: () => import('@/components/Product.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/Profile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
