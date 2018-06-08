<template>
  <div class="cms-page">
    <cmsAside></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">Panda 前端框架</h2>
      <h3>前言</h3>
      <p class="red2">建议新入职的前端工程师，能仔细浏览本页面和开发文档。</p>
      <p>此框架主要用于Localpanda前端项目工程，包括：PC、H5、CMS系统。<br>希望各位前端工程师能严格遵守规范，并一起努力维护、优化，将框架更好的传承下去。让开发更便捷，性能更卓越。</p>

      <h3>框架GitHub地址</h3>
      <p>HTTP地址：https://github.com/yanganyun/panda.git<br>SSH地址：git@github.com:yanganyun/panda.git</p>

      <h3>框架结构</h3>
      <script class="preCode" type="text/plain">
panda/
│
├── src/
│   ├── assets/             //资源目录css,js,img
│   │
│   │
│   ├── components/         //vue模块和组件
│   │
│   │
│   ├── panda/              //框架组件放置区域
│   │
│   │
│   ├── pages/              //页面目录
│   │   │
│   │   ├── criterion/      //开发文档相关页面
│   │   │
│   │   ├── vue/            //vue组件相关页面
│   │   │
│   │   ├── js/             //JS组件相关页面
│   │   │
│   │   ├── css/            //CSS组件相关页面
│   │   │
│   │   └── index           //首页
│   │
│   │
│   └── router/
│       │
│       ├── router.js       //全站路由和导航配置文件
│       │
│       ├── index.js        //路由生成器
│       │
│       └── nav.js          //导航生成器
│
│
├── static/                 //静态资源目录 
│   │
│   ├── css/                //静态css资源
│   │
│   ├── js/                 //静态js资源
│   │
│   ├── Highlighter/        //代码高亮组件
│   │
│   └── UE/                 //文本编辑器组件
│
│
└── README.md
      </script>

      <h3>框架维护指南</h3>
      <p>1、<span class="red2">路由和左侧导航修改</span>：panda/src/router/router.js，这个js文件修改后会自动生成路由和导航。</p>
      <p>2、<span class="red2">当前页面导航高亮设置</span>：导航组件activeTitle中传入'1-1'，第一个1是让第一个导航展开，第二个1是让下面的第一个导航高亮，中间用 - 分割。示例如下：</p>
      <script class="preCode" type="text/plain">
        <cmsAside :activeTitle="'1-1'"></cmsAside>   //传入的值是字符串，要带引号。
      </script>
      
      <p>3、所有的标题都用h3标签。</p>
      <p>4、所有的描述文字都用p标签。<span class="red2">标红字体</span>用class="red2"，<span class="code2">蓝色背景文字</span>用class="code2"，其它常用样式见base.css文件。</p>
      <p>5、<span class="red2">代码高亮写法</span>：把要显示的代码写在script标签内，<span class="code2">class、type</span>必须加。如果需要设置最大高度，再加上<span class="code2">maxHeight="300"</span>，设置代码类型<span class="code2">brush="html"</span>。见下图示例。</p>
      <script class="preCode" type="text/plain">
        &lt;script class="preCode" type="text/plain" maxHeight="300" brush="js">
          var test = '欢迎使用panda框架';
          alert(test);
        &lt;/script>
      </script>

      <h3>框架开发者</h3>
      <dl class="dl_list">
        <dt>缔造者：</dt>
        <dd>
          <a href="https://www.fedrobots.com/admin.html" target="_blank">杨安云</a>
        </dd>
      </dl>
      <dl class="dl_list">
        <dt>开发者：</dt>
        <dd>
          <a href="https://www.fedrobots.com/admin.html" target="_blank">杨安云</a>
        </dd>
      </dl>
      <p class="mt10 red2">所有参与维护的开发者，自觉到此留名。</p>

      <!-- 代码高亮 -->
      <!-- <script class="preCode" type="text/plain">
        var test = '欢迎使用panda框架';
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
