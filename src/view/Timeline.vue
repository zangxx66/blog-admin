<template>
    <mu-container>
        <Breadcrumb :items="bar"></Breadcrumb>
        <div class="addBtn">
            <div class="button-wrapper">
                <mu-button color="secondary" @click="create">
                    <mu-icon left value="add">新建</mu-icon>
                </mu-button>
            </div>
        </div>
        <Table ref="table"></Table>
    </mu-container>
</template>
<script>
import Breadcrumb from "../components/Timeline/Breadcrumb";
import Table from "../components/Timeline/Table";
import Axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      reqUrl: this.$store.getters.getReqUrl(),
      bar: [
        {
          text: "主页",
          path: "/",
          disabled: false
        },
        {
          text: "更新记录",
          path: "/Timeline.html",
          disabled: true
        }
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      const apiUrl = this.reqUrl + "/TimeLine/Get";

      Axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";

      Axios.get(apiUrl)
        .then(response => {
          this.$refs.table.init(response.data);
        })
        .catch(e => {
          this.$alert("获取列表错误");
          console.error(e);
        });
    },
    create: function() {
      this.$prompt("请输入内容", "提示", {
        validator(value) {
          return {
            valid: /(^\s*)|(\s*$)/.test(value),
            message: "不能为空"
          };
        }
      }).then(({ result, value }) => {
        if (result) {
          this.add(value);
        }
      });
    },
    add: function(param) {
      const apiUrl = this.reqUrl + "TimeLine/post";
      const args = JSON.stringify({
        Id: "ab0f9474-b3de-4066-a01e-5d42d4fe6d7f",
        Content: param
      });

      Axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";

      Axios.post(apiUrl, Qs.stringify({ jsonStr: args }))
        .then(response => {
          if (response.status == 200) {
            this.$alert("提交成功").then(() => {
              this.$router.replace("/TimeLine.html");
            });
          } else {
            this.$alert("提交失败，" + response.status);
          }
        })
        .catch(e => {
          this.$alert("提交错误");
          console.error(e);
        });
    }
  },
  components: {
    Breadcrumb,
    Table
  }
};
</script>
<style scoped>
.addBtn {
  margin-top: 10px;
}
</style>