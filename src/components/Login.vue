<template>
  <div id="login">
    <el-form
      :model="ruleForm2"
      status-icon
      :rules="rules2"
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm2.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
        <el-button @click="resetForm('ruleForm2')">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      ruleForm2: {
        password: "",
        username: ""
      },
      rules2: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "用户名的长度需在 5 到 12 个字符",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 5,
            max: 12,
            message: "密码的长度需在 5 到 12 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("/api/login", {
              username: this.ruleForm2.username,
              password: this.ruleForm2.password
            })
            .then(res => {
              if (res.data.errno) {
                // 如果登录失败 弹出失败提示
                this.$message.error("密码错误或者该用户不存在，请重试！");
                return;
              }
              this.$message({
                message: "恭喜你，登录成功！",
                type: "success"
              });
              // 登陆成功 跳转到admin页面
              setTimeout( () => {
                this.$router.push({
                path: '/admin',
                name: 'Admin',
              })
              }, 2000)

              // 要修改store中的state数据 必须触发mutations中对应的函数 在函数内部修改state的数据
              this.$store.commit('saveLoginUser', this.ruleForm2.username)


            });
          // alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // //如果username 和 password的验证都通过了
          this.$axios
            .post("/api/register", {
              username: this.ruleForm2.username,
              password: this.ruleForm2.password
            })
            .then(res => {
              if (res.data.errno) {
                // 注册失败 用户已存在
                this.$message.error("注册失败 用户已存在！");
                return;
              }
              this.$message({
                message: "恭喜你，注册成功！",
                type: "success"
              });
            });
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 500px;
  height: 250px;
  padding: 20px 30px 40px 0px;
  margin: auto;
  box-shadow: 0 0 10px 0 blue;
}

#login h3 {
  font-size: 28px;
  text-align: center;
  line-height: 70px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
