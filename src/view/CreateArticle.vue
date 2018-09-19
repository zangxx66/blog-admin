<template>
    <md-card>
    <md-card-actions>
      <div class="md-subhead">
        <mu-text-field v-model="title" placeholder="标题..."></mu-text-field>
        <mu-text-field v-model="category" placeholder="标签..."></mu-text-field>
      </div>
    </md-card-actions>
    <md-card-media>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption">
        </quill-editor>
      </div>
    </md-card-media>
  </md-card>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import Axios from 'axios'
export default {
  data() {
    return {
      title:'',
      content: '',
      category:'',
      reqUrl:this.$store.getters.getReqUrl(),
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
      }
    }
  },
  mounted(){
      
  },
  methods:{
      
  },
  components:{
      quillEditor
  }
};
</script>
