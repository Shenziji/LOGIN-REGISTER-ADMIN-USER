import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Admin from '@/components/Admin'
import UserList from '@/components/UserList'
import OldUser from '@/components/OldUser'
import YoungUser from '@/components/YoungUser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin,
      children: [
        {
          path: '/userlist',
          component: UserList
        },
        {
          path: '/olduser',
          component: OldUser
        },
        {
          path: '/younguser',
          component: YoungUser
        },
      ]
    },
  ]
})
