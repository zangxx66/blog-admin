<template>
  <div id="app">
    <div class="appbar">
 <mu-appbar style="width=100%" color="primary">
   Satania
      <mu-menu slot="right" v-if="userinfo.nickName != ''">
        <mu-button flat>{{userinfo.nickName}}</mu-button>
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
    </div>
   
    <router-view/>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "App",
  data() {
    return {
      reqUrl: this.$store.getters.getReqUrl()
    };
  },
  computed: {
    userinfo() {
      const objStr = this.$store.getters.getUserInfo();
      if (objStr == "" || objStr == null || objStr == undefined) {
        this.$router.replace("/Login.html");
        return { nickName: "" };
      } else if (objStr == null || Object.keys(objStr).length <= 0) {
        this.$router.replace("/Login.html");
        return { nickName: "" };
      } else {
        const usr = JSON.parse(objStr);
        return usr;
      }
    }
  },
  methods: {
    SingOut: function() {
      const apiUrl = this.reqUrl + "Ajax";
      Axios.get(apiUrl)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit("delUserInfo");
            this.$router.replace("/Login.html");
          } else {
            this.$alert("退出报错了");
          }
        })
        .catch(err => {
          this.$alert("退出存在异常");
          console.error(err);
        });
    }
  }
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style scoped>
.appbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
}
.mu-button {
  text-transform: none;
}
</style>
