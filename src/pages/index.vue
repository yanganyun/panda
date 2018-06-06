<template>
  <div class="cms-page">
    <cmsAside></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Localpanda 前端框架</h2>
      <br>
      <h3>前言</h3>
      <p>此框架主要用于Localpanda前端项目工程，包括：PC、H5、CMS系统。<br>希望各位前端工程师能严格遵守规范，并一起努力维护、优化，将框架更好的传承下去。让开发更便捷，性能更卓越。</p>

      <h3>框架结构</h3>
      <script class="preCode" type="text/plain">
thepro/
├── static/
│   ├── css/
│   │   ├── base/           基础样式
│   │   ├── modules/        模块样式
│   │   ├── base.css&modules.css    集成样式
│   │   └── proname.css     对应项目css
│   │
│   ├── js/
│   │   ├── plugin/         //插件
│   │   ├── init.js         //js加载器
│   │   ├── pc.js           //工具公共类
│   │   └── proname.js      //对应项目js
│   │
│   └── img/
│       ├── combo.png       //公共集成图片
│       ├── combo8.png
│       └── proname/        //对应项目图片
dev
├── proname.html
│   ├── temp/               //临时文件夹
│   │
│   └── README.md
│
└── README.md
      </script>

      <!-- 代码高亮 -->
      <!-- <script class="preCode" type="text/plain">
        var test = 'Localpanda';
        alert(test);
      </script> -->



    </div>
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';


export default {
  name: 'index',
  components: {
    cmsAside
  },
  data() {
    return {
      title : 'Localpanda CMS 管理系统',
      keywords: 'Localpanda CMS 管理系统',
      description: 'Localpanda CMS 管理系统'
    }
  },
  head(){
    return {
      title: this.title,
      meta: [{
        name: "keywords",
        content: this.keywords
      },
      {
        name: "description",
        content: this.description
      }]
    }
  },
  mounted(){
    

  },
  methods:{
    
  }
}

</script>

<style lang="css">
  
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  
</style>
