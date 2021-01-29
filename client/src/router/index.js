import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Add from '../views/Add.vue'
import Edit from '../views/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.token
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})

export default router
