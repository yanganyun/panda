<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'1-3'"></cmsAside>

    <div class="cms-main">

      <h2 class="cms-page-title">开发流程</h2>

      <h3>登录流程</h3>

      <h3>微信支付流程</h3>
      <h4>PC支付流程</h4>
      <p>PC端微信支付，请求接口获得二维码链接，生成二维码，扫码下单。</p>
      <p>PC端微信支付，请求接口获得二维码链接，生成二维码，扫码下单。</p>

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
