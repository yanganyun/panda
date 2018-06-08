<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'1-1'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">开发指南</h2>

      <h3>PC端</h3>
      <h4>项目Github地址</h4>
      <p>https地址：<span class="code2">https://github.com/rogerXYJ/localpanda.git</span></p>
      <p>SSH地址：<span class="code2">git@github.com:rogerXYJ/localpanda.git</span></p>

      <h4>安装和运行</h4>
      <p>项目下载完毕后执行，在项目文件夹中执行命令行：<span class="code2">cnpm i</span>等待安装完成后，<span class="code2">npm run dev</span>启动项目。<br>如果 vue-cli 没有安装, 需先通过 <span class="code2">npm install -g vue-cli</span> 来安装。</p>

      <script class="preCode" type="text/plain">
localpanda/
│
├── assets/                 //资源目录css,js,img,font
│
├── components/             //页面模版碎片目录
│   │
│   ├── Banner/             //首页banner
│   │
│   ├── HeaderCommon/       //公共头部
│   │
│   ├── FooterCommon/       //公共底部
│   │
│   ├── pageComponents/     //页面模版
│   │
│   ├── panda/              //panda前端组件目录
│   │
│   └── Prompt/             //弹窗相关模版
│
│
├── middleware/             //中间件，在页面渲染之前加载的一些东西
│
├── pages/                  //页面目录，创建目录会自动生成与目录对应的路由
│   │
│   ├── activity/           //活动相关页面（列表，详情，下单，支付等）
│   │
│   ├── feedback/           //反馈页面
│   │
│   ├── guide/              //导游相关页面（列表，详情，下单，支付等）
│   │
│   ├── info/               //关于我们，合同条款等信息
│   │
│   ├── inquiry/            //用户咨询相关页面
│   │
│   ├── payment/            //支付结果相关页面
│   │
│   ├── travel/             //旅游相关页面
│   │
│   └── user/              //用户个人中心页面
│
│
├── plugins/                //第三方组件放置区域
│
│
├── static/                 //静态资源目录 
│
│
├── nuxt.config.js          //项目打包配置文件
│
│
└── README.md
      </script>



      <h3>移动端</h3>
      <h4>项目Github地址</h4>
      <p>https地址：<span class="code2">https://github.com/rogerXYJ/localpanda-h5.git</span></p>
      <p>SSH地址：<span class="code2">git@github.com:rogerXYJ/localpanda-h5.git</span></p>

      <h4>安装和运行</h4>
      <p>项目下载完毕后执行，在项目文件夹中执行命令行：<span class="code2">cnpm i</span>等待安装完成后，<span class="code2">npm run dev</span>启动项目。<br>如果 vue-cli 没有安装, 需先通过 <span class="code2">npm install -g vue-cli</span> 来安装。</p>

      <script class="preCode" type="text/plain">
localpanda-h5/
│
├── assets/                 //资源目录css,js,img,font
│
├── components/             //页面模版碎片目录
│   │
│   ├── activity/           //活动相关页面（列表，详情，下单，支付等碎片）
│   │
│   ├── booking/            //我的订单
│   │
│   ├── header/             //公共头部
│   │
│   ├── footer/             //公共底部
│   │
│   ├── info/               //页面模版
│   │
│   └── panda/              //panda前端组件目录
│
│
├── middleware/             //中间件，在页面渲染之前加载的一些东西
│
├── pages/                  //页面目录，创建目录会自动生成与目录对应的路由
│   │
│   ├── activity/           //活动相关页面（列表，详情，下单，支付等）
│   │
│   ├── info/               //反馈，咨询，关于我们，合同条款等信息
│   │
│   ├── wx/                 //微信授权中转页面（已经弃用）
│   │
│   └── user/               //订单查询、用户个人中心等页面
│
│
├── plugins/                //第三方组件放置区域
│
│
├── static/                 //静态资源目录 
│
│
├── nuxt.config.js          //项目打包配置文件
│
│
└── README.md
      </script>



      <h3>CMS</h3>
      <h4>项目Github地址</h4>
      <p>https地址：<span class="code2">https://github.com/rogerXYJ/localpanda-cms.git</span></p>
      <p>SSH地址：<span class="code2">git@github.com:rogerXYJ/localpanda-cms.git</span></p>

      <h4>安装和运行</h4>
      <p>项目下载完毕后执行，在项目文件夹中执行命令行：<span class="code2">cnpm i</span>等待安装完成后，<span class="code2">npm run dev</span>启动项目。<br>如果 vue-cli 没有安装, 需先通过 <span class="code2">npm install -g vue-cli</span> 来安装。</p>
      <script class="preCode" type="text/plain">
localpanda-cms/
│
├── build/                  //webpack配置文件
│
├── config/                 //打包配置文件
│
├── src/
│   │
│   ├── assets/             //资源目录css,js,img
│   │
│   ├── components/         //vue模块和组件
│   │
│   ├── panda/              //框架组件放置区域
│   │
│   ├── pages/              //页面目录
│   │   │
│   │   ├── content/        //文章录入
│   │   │
│   │   └── lp/             //Landing page 相关页面
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
│   └── UE/                 //文本编辑器组件
│
│
└── README.md
      </script>

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
  data () {
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
