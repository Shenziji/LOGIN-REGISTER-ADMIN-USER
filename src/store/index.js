import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: { // state 存放所有组件都可以使用的数据
    loginUser: localStorage.getItem('user'),
    userList: []
  },
  // 过滤state数据
  getters: {
    oldUser: state => state.userList.filter( user => user.age >= 30),
    youngUser: state => state.userList.filter( user => user.age < 30)
    },
    
  // 放置同步修改state数据的方法
  mutations: {
    saveLoginUser(state, value) {
      state.loginUser = value
      localStorage.setItem('user', value)
    },
    saveuserlist(state, value) {
      state.userList = value
    }
  },

  // 
  actions: {
    getUserList({commit}) {
      return new Promise( (resolve, rej) => {
        axios.get('/api/userlist')
        .then(users => {
          // console.log(users);
          commit('saveuserlist', users.data)
          resolve()
        })
      })
    }
  }
})
