<template>
  <div id="app">
    <mu-appbar style="width=100%" color="primary">
      <mu-menu slot="right">
        <mu-button flat>{{userinfo.NickName}}</mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-content>
              <mu-list-item-title>个人资料</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
          <mu-list-item button @click="SingOut">
            <mu-list-item-content>
              <mu-list-item-title>退出</mu-list-item-title>
            </mu-list-item-content>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <router-view/>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'App',
  data(){
    return{
      userinfo:{},
      reqUrl:this.$store.getters.getReqUrl()
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init:function(){
      const objStr = this.$store.getters.getUserInfo()
      if(objStr == '' || objStr == null || objStr == undefined){
        this.$router.replace('/Login.html')
      }
      const usr = JSON.parse(objStr)
      this.userinfo = usr
      if(this.userinfo == null || Object.keys(this.userinfo).length <= 0){
        this.$router.replace('/Login.html')
      }
    },
    SingOut:function(){
      const apiUrl = this.reqUrl + 'Ajax'
      Axios.get(apiUrl).then(response=>{
        if(response.status == 200){
          this.$store.commit('delUserInfo')
          this.$router.replace('/Login.html')
        }else{
          this.$alert('退出报错了')
        }
      }).catch(err=>{
        this.$alert('退出存在异常')
        console.error(err)
      })
    }
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
