<template>
    <div class="tab-box">
        <mu-paper :z-depth="1">
            <mu-data-table border :columns="columns" :data="list">
                <template slot-scope="scope">
                    <td>{{scope.row.createDate | filterTime}}</td>
                    <td>{{scope.row.content}}</td>
                    <td>
                        <mu-flex justify-content="center" align-items="center" class="options-box">
                          <mu-button icon @click="openDetail(scope.row)">
                            <mu-icon right value="edit"></mu-icon>
                          </mu-button>
                            <mu-button icon @click="confirmDel(scope.row.id)">
                                <mu-icon right value="delete"></mu-icon>
                            </mu-button>
                        </mu-flex>
                    </td>
                </template>
            </mu-data-table>
        </mu-paper>
    </div>
</template>
<script>
import Axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      columns: [
        {
          title: "时间",
          width: 200,
          name: "title"
        },
        {
          title: "内容",
          width: 200,
          name: "content"
        },
        {
          title: "操作",
          //   width: 200,
          name: "option",
          align: "center"
        }
      ],
      list: [],
      reqUrl: this.$store.getters.getReqUrl()
    };
  },
  methods: {
    init: function(param) {
      this.list = param;
    },
    openDetail: function(param) {
      this.$prompt("请输入内容", "提示", {
        inputValue: param.content,
        validator(value) {
          return {
            valid: /(^\s*)|(\s*$)/.test(value),
            message: "不能为空"
          };
        }
      }).then(({ result, value }) => {
        if (result) {
          this.update(value, param.id);
        }
      });
    },
    update: function(content, id) {
      const apiUrl = this.reqUrl + "TimeLine/Put";

      const args = JSON.stringify({
        Id: id,
        Content: content
      });

      Axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";

      Axios.put(apiUrl, Qs.stringify({ jsonStr: args }))
        .then(response => {
          if (response.status == 204) {
            this.$alert("更新成功").then(() => {
              this.$router.replace("/TimeLine.html");
            });
          } else {
            this.$alert("提交失败," + response.status);
          }
        })
        .catch(e => {
          this.$alert("提交错误");
          console.error(e);
        });
    },
    confirmDel: function(param) {
      this.$confirm("是否删除？", "提示", {
        type: "warning"
      }).then(({ result }) => {
        if (result) {
          this.del(param);
        }
      });
    },
    del: function(param) {
      const apiUrl = this.reqUrl + "TimeLine/" + param;

      Axios.delete(apiUrl)
        .then(response => {
          if (response.status == 404) {
            this.$alert("不存在");
            return false;
          } else if (response.status == 204) {
            this.$alert("删除成功");
            this.list.filter(obj => obj.id == param);
          } else {
            this.$alert("删除失败", response.status);
          }
        })
        .catch(err => {
          this.$alert("请求错误");
          console.error(err);
        });
    }
  },
  filters: {
    filterTime: function(param) {
      let result = String(param);
      result = result.replace(/T/g, " ");
      result = result.substring(0, 19);
      return result;
    }
  }
};
</script>
