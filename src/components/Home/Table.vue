<template>
    <div class="tab-box">
        <mu-paper :z-depth="1">
            <mu-data-table border :columns="columns" :data="list">
                <template slot-scope="scope">
                    <td @click="openDetail(scope.row.id)" style="cursor: pointer;">{{scope.row.title}}</td>
                    <td>
                        <mu-flex justify-content="center" align-items="center" class="options-box">
                            <mu-button @click="confirmDel(scope.row.id)">
                                delete
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
import Axios from 'axios'
import Qs from 'qs'

export default {
  // props:['list'],
  data() {
    return {
      columns: [
        { title: '标题', width: 200, name: 'title' },
        { title: '操作', wiidth: 200, name: 'option', align: 'center' }
      ],
      reqUrl: this.$store.getters.getReqUrl(),
      list: []
    }
  },
  methods: {
    init: function(param) {
      this.list = param
    },
    openDetail: function(param) {
      this.$router.push({ name: 'EditArticle', params: { id: param } })
    },
    confirmDel: function(param) {
      this.$confirm('是否删除？', '提示', {
        type: 'warning'
      }).then(({ result }) => {
        if (result) {
          this.del(param)
        }
      })
    },
    del: function(param) {
      const apiUrl = this.reqUrl + 'Article/' + param

      Axios.delete(apiUrl)
        .then(response => {
          if (response.status == 404) {
            this.$alert('文章不存在')
            return false
          } else if (response.status == 204) {
            this.$alert('删除成功')
            this.list.filter(obj => obj.id == param)
          } else {
            this.$alert('删除失败', response.status)
          }
        })
        .catch(err => {
          this.$alert('请求错误')
          console.error(err)
        })
    }
  }
}
</script>
<style scoped>
.tab-box {
  margin-top: 10px;
}
.options-box .mu-button{
    text-transform: none;
}
</style>
