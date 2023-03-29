import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login'
import Home from '../views/Home'

//引入师生交流专区
import Froum from '@/views/ifroum/Froum'


import Test1 from '@/views/Test1'
import Test2 from '@/views/Test2'

Vue.use(VueRouter)

const routes = [

  
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden: true
  },
  

  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/ifroum',
        name: '师生交流专区',
        component: Froum,
      }
    ]
  },





]

const router = new VueRouter({
  routes
})

export default router
