<template>
  <div class="login">
    <div class="input">
      <div class="ele">
        <el-input v-model="name" type="text" placeholder="请输入用户名"></el-input>
      </div>
      <div class="ele">
        <el-input v-model="pass" type="password" placeholder="请输入密码"></el-input>
      </div>
      <div class="ele">
        <el-button round="true" type="primary" style="float: right" @click="login()" >登录</el-button>
      </div>
    </div>
  </div>

</template>

<script>
import {login} from "@/api/login";
import {setToken} from "@/common/auth";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  mounted() {
  },
  data() {
    return {
      name: '',
      pass: '',
      info:{},
      res:{},
    }
  },
  methods: {
    //登录
    login(){
      if (this.name === '' || this.pass === '') {
        this.msgError('用户名或密码不能为空')
        return
      }
      this.info = {
        username : this.name,
        password: this.pass,
      }
      login(this.info).then(response => {
        if (response.code === 200) {
          setToken("token", response.data[0])
          this.$store.dispatch("setToken2State", response.data[0])
          this.msgSuccess("登录成功！")
          this.$router.push({ path: "/home/menu"})
        } else {
          this.msgError("用户名或密码校验失败")
        }
      })
    }
  }
}
</script>

<style scoped lang="css">
.login {
  background-image: url("../../assert/img.png");
  background-size: cover;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.input {
  margin-top: 20vh;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.ele {
  margin-top: 25px;
  width: 80%;
  display: flex;
  justify-content: center;
}


</style>
