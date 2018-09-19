<template>
    <mu-container>
        <mu-card style="width:100%;margin:0 auto;max-width:375px;">
            <mu-card-header title="Satania" sub-title="Login"></mu-card-header>
            <mu-card-text>
                <mu-text-field v-model="username" label="UserName" label-float icon="account_circle"></mu-text-field>
                <br>
                <mu-text-field v-model="password" label="Password" label-float icon="locked">
                    <br>
                </mu-text-field>
            </mu-card-text>
            <mu-card-actions>
                <mu-flex justify-content="center" aligin-items="center">
                    <mu-button full-width color="primary" @click="login">登录</mu-button>
                </mu-flex>
            </mu-card-actions>
        </mu-card>
    </mu-container>
</template>
<script>
import Axios from 'axios'
export default {
  data() {
    return {
      username: '',
      password: '',
      reqUrl: this.$store.getters.getReqUrl()
    }
  },
  methods:{
      login:function(){
          const apiUrl = this.reqUrl + 'Ajax/Login'
          if(this.username == '' || this.password == ''){
              this.$alert('用户名和密码不能为空')
              return false
          }

          Axios.post(apiUrl,{username:this.username,password:this.password}).then(response=>{
              if(response.status != 200){
                  this.$alert(response.data)
                  return false
              }else{
                  this.$store.commit('setUserInfo',response.data)
                  this.$router.replace('/')
              }
          }).catch(err=>{
              this.$alert('请求错误')
              console.error(err)
          })
      }
  }
}
</script>
