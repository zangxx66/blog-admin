<template>
    <div class="paper-box">
        <Breadcrumb :items="bar"></Breadcrumb>
        <div class="create-box">
            <mu-text-field v-model="title" placeholder="标题..."></mu-text-field>
            <br>
            <mu-text-field v-model="category" placeholder="标签..."></mu-text-field>
            <br>
            <mu-text-field v-model="summary" placeholder="描述..."></mu-text-field>
        </div>
        <div class="quill-editor-example">
            <!-- quill-editor -->
            <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
            </quill-editor>
        </div>
        <div class="btn-box">
            <mu-flex justify-content="center" align-items="center">
                <mu-button color="primary" @click="submit">提交</mu-button>
                <mu-button to="/">返回</mu-button>
            </mu-flex>
        </div>
    </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Breadcrumb from '../components/Home/Breadcrumb'
import Axios from 'axios'
import Qs from 'qs'

export default {
  data() {
    return {
      title: '',
      content: '',
      category: '',
      summary: '',
      id: '',
      reqUrl: this.$store.getters.getReqUrl(),
      editorOption: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ header: 1 }, { header: 2 }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ['clean'],
          ['link', 'image', 'video']
        ]
      },
      bar: [
        {
          text: '主页',
          path: '/',
          disabled: false
        },
        {
          text: '编辑',
          path: '/EditArticle.html',
          disabled: true
        }
      ]
    }
  },
  mounted() {
    this.$refs.myTextEditor.quill.container.style.height = '500px'
    const args = this.$route.params.id
    this.init(args)
  },
  methods: {
    init: function(param) {
      const apiUrl = this.reqUrl + 'Article/Detail'
      const args = param
      Axios.get(apiUrl, { params: { artid: args } })
        .then(response => {
          if (response.status == 404) {
            this.$alert('未找到实体')
          } else if (response.status == 200) {
            const callback = response.data
            this.title = callback.title
            this.content = callback.context
            this.summary = callback.summary
            this.category = callback.category
            this.id = callback.id
          } else {
            this.$alert('获取实体报错,' + response.status)
          }
        })
        .catch(err => {
          this.$alert('获取实体错误')
          console.error(err)
        })
    },
    submit: function() {
      const apiUrl = this.reqUrl + 'Article/Put'
      const args = JSON.stringify({
        Id: this.id,
        Summary: this.summary,
        Title: this.title,
        Category: this.category,
        Context: this.content
      })

      Axios.defaults.headers.post['Content-Type'] =
        'application/x-www-form-urlencoded;charset=UTF-8'

      Axios.put(apiUrl, Qs.stringify({ jsonStr: args }))
        .then(response => {
          if (response.status == 204) {
            this.$alert('更新成功')
            this.$router.replace({
              name: 'EditArticle',
              params: { id: this.id }
            })
          } else {
            this.$alert('提交失败,' + response.status)
          }
        })
        .catch(err => {
          this.$alert('提交错误')
          console.error(err)
        })
    }
  },
  components: {
    Breadcrumb,
    quillEditor
  }
}
</script>
<style scoped>
.paper-box {
  margin: 0 auto;
  width: 800px;
}
.create-box {
  padding-left: 10px;
}
.btn-box {
  margin-top: 10px;
}
.btn-box .mu-button {
  margin: 8px;
}
</style>