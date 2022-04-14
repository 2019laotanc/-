<template>
  <div class="container-flex">
    <div class="home">
          <div class="login-title">登录入口</div>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"  >
              <el-form-item prop="user">
                <el-input v-model.number="ruleForm.user" placeholder="请输入用户名">
                  <i slot="prefix" style="display:block;  margin:4px 8px 0 0 ">
                    <icon-park type="people" size="18" theme="filled"/>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item  prop="password">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码">
                   <i slot="prefix" style="display:block;  margin:4px 8px 0 0">
                    <icon-park type="lock" size="18" theme="filled"/>
                  </i>
                </el-input>
              </el-form-item>
              <el-form-item >
                <el-button type="primary" @click="submitForm('ruleForm')" class="demo-ruleForm">登录</el-button>
              </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

import JSEncrypt from 'jsencrypt'

export default {
  name: 'Home',
  data(){
    return{
      ruleForm:{
        user:'',
        password:'',
      },
      kid:'',
      key: "",
      rules: {
        user: [{ required: true, message: "请输入名称", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    }
    }
  },
  created(){
    
      
  },
  methods:{
    submitForm(formName){
      let self = this
       this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$test.get_key().then( res => {
              let key = res.data.data.key
              let kid = res.data.data.kid

              let encryptor = new JSEncrypt()
              encryptor.setPublicKey(key)
              let rsaPassWord = encryptor.encrypt(self.ruleForm.password)
              let params = {
                kid:kid,
                username:self.ruleForm.user,
                password:rsaPassWord
              }
              this.$test.login(params).then( res => {
                if(res.data.code === 20000){
                      // 设置cookie默认过期时间单位是1d(1天)
                  
                  self.$cookie.set('Admin-Token', res.data.data.token);
                  self.$cookie.set('Expire-Time', res.data.data.expire);
                  self.$cookie.set('sidebarStatus', 0);
                  this.$test.get_user_info().then( res => {
                     if(res.data.code === 20000){
                      localStorage.setItem('role',JSON.stringify(res.data.data.roles))
                    }
                  })
                  self.$router.push({
                    path:'/index'
                  }) 
                }else{
                  self.$notify({
                  title: "温馨提示",
                  message: res.error_msg,
                  type: "error",
                  position: "top-right"
                });
                }
              })
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    }
  }

</script>

<style lang="less" scoped>

.container-flex{
  background-color: #2D3A4B;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // background-color: rgb(245, 236, 236);?
}
.home{
  width: 300px;
  height: 200px;
  padding-bottom: 160px;
}

  /deep/ .el-form-item__content{
    display: flex;
    justify-content: center;
  }
  .el-button{
    width:100px
  }
  .login-title{
    font-size: 26px;
    color: #eee;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }


</style>
