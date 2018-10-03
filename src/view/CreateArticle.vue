<template>
  <div class="paper-box">
    <Breadcrumb :items="bar"></Breadcrumb>
    <div class="create-box">
      <mu-text-field v-model="title" placeholder="标题..."></mu-text-field>
      <br>
      <mu-text-field v-model="category" placeholder="标签..."></mu-text-field>
      <br>
      <mu-text-field v-model="summary" placeholder="描述..."></mu-text-field>
      <br>
      <span>是否公开</span>
      <mu-switch v-model="enable"></mu-switch>
    </div>
    <br>
    <div class="quill-editor-example">
      <!-- quill-editor -->
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption">
      </quill-editor>
    </div>
    <div class="btn-box">
      <mu-flex justify-content="center" align-items="center">
        <mu-button full-width color="primary" @click="submit">提交</mu-button>
      </mu-flex>
    </div>
  </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Breadcrumb from "../components/Home/Breadcrumb";
import Axios from "axios";
import Qs from "qs";

export default {
  data() {
    return {
      title: "",
      content: "",
      category: "",
      summary: "",
      enable:true,
      reqUrl: this.$store.getters.getReqUrl(),
      editorOption: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["clean"],
          ["link", "image", "video"]
        ]
      },
      bar: [
        {
          text: "主页",
          path: "/",
          disabled: false
        },
        {
          text: "新建",
          path: "/CreateArticle.html",
          disabled: true
        }
      ]
    };
  },
  mounted() {
    this.$refs.myTextEditor.quill.container.style.height = "500px";
  },
  methods: {
    submit: function() {
      const apiUrl = this.reqUrl + "Article/post";
      const args = JSON.stringify({
        Id: "ab0f9474-b3de-4066-a01e-5d42d4fe6d7f",
        Summary: this.summary,
        Title: this.title,
        Category: this.category,
        Enable:this.enable,
        Context: encodeURIComponent(this.content)
      });
      const userInfo = this.$store.getters.getUserInfo();
      let id = "";
      if (userInfo != null || Object.keys(userInfo).length > 0) {
        id = JSON.parse(userInfo).id;
      } else {
        this.$router.replace("/Login.html");
      }

      Axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded;charset=UTF-8";

      Axios.post(apiUrl, Qs.stringify({ jsonStr: args, id: id }))
        .then(response => {
          if (response.status == 404) {
            this.$alert("登录超时");
          } else if (response.status == 200) {
            this.$alert("提交成功").then(({ result, value }) => {
              this.$router.replace("/Home.html");
            });
          } else {
            this.$alert("提交错误," + response.status);
          }
        })
        .catch(err => {
          this.$alert("提交错误");
          console.error(err);
        });
    }
  },
  components: {
    quillEditor,
    Breadcrumb
  }
};
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
</style>
