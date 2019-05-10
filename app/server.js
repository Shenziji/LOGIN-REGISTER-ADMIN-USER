const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const Users = require('./schema/users')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

app.use(bodyParser.json())

app.use('/login', (req, res)=> {
  console.log(req.body);
  let {username, password} = req.body
  Users.findOne({ // 从users集合中查找用户
    username,
    password
  }).then( user => {
    // 
    // console.log(user);
    
    if(user){ // 如果找到该用户 则登录成功 返回0
      res.send({
        errno: 0
      })

    } else {
      res.send({ // 如果没找到该用户 则登录失败 返回1
          errno: 1
      })
    }
    
  })
  // console.log(res.body);
  
})

app.use('/register', (req, res) => {
  let {username, password} = req.body
  console.log(req.body);
  Users.findOne({
    username
  }).then( user => {
    console.log(user);
    
    if(user) { // 如果找到了注册的用户 说明已经注册过了 不可以重复注册 返回 1
      res.send({
        errno: 1
      })
      return
    }
    res.send({ // 没有找到本次注册的用户 说明没有被注册过 可以注册  返回 0
      errno: 0
    })
    new Users({ // 保存注册成功的用户数据到users集合
      username,
      password,
      age: ~~(Math.random()*20+20)
    }).save()
  })
  
})


app.get('/userlist', (req, res) => {
  Users.find().then( users => {
    res.send(users)
  })
})


mongoose.connect('mongodb://localhost:27018/vuex', {useNewUrlParser: true}, (err) => {
  if (err) {
    console.log('数据库连接失败');
    return
    
  }
  app.listen(3000, () => {
    console.log('监听在3000端口');
    
  })
  console.log('数据库连接成功');
  
})