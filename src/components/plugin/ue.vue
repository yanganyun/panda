<template>
  <div>
    <script :id=id type="text/plain"></script>
  </div>
</template>
<script>

import '../../../static/UE/ueditor.config.js'
import '../../../static/UE/ueditor.all.min.js'
import '../../../static/UE/lang/en/en.js'
import '../../../static/UE/ueditor.parse.min.js'

  export default {
    name: 'UE',
    data () {
      return {
        editor: null
      }
    },
    props: {
      defaultContent: {
        type: String
      },
      config: {
        type: Object
      },
      id: {
        type: String
      },
    },
    mounted() {
      const self = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE
      // 确保UE加载完成后，放入内容。
      this.editor.addListener("ready", function () {
        if(self.defaultContent){
            self.editor.setContent(self.defaultContent);
        }
      });
      console.log("上传这堆错误不用理会，上传接口需自行开发配置");
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      },
      getUEContentTxt() { // 获取纯文本内容方法
        return this.editor.getContentTxt()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>

<style>
.edui-default{ line-height: 22px!important;}
</style>
