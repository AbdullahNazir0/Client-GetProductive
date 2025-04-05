import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Layout from '../layouts/Layout.vue'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const routes = [
  { path: '/', component: Layout, children: [
    {
      path: '',
      redirect: { name: 'home' }
    },
    { name: 'Home', path: '/home', beforeEnter: authMiddleware, component: () => import('../views/Home.vue') },
    { name: 'AllTasks', path: '/all-tasks', beforeEnter: authMiddleware, component: () => import('../views/AllTasks.vue') },
  ]},
  { name: 'Register', path: '/auth/register', component: Register },
  { name: 'Login', path: '/auth/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
